// Production API Client connecting apps/web-portal to services/game-backend (NestJS Fastify)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class GameApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('jaebin_jwt_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('jaebin_jwt_token', token);
      } else {
        localStorage.removeItem('jaebin_jwt_token');
      }
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('jaebin_jwt_token');
    }
    return this.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(err.message || `API error ${response.status}`);
    }
    return response.json();
  }

  // Health check
  async checkHealth(): Promise<{ status: string; latencyMs: number }> {
    const start = Date.now();
    try {
      await fetch(`${this.baseUrl}/api/game/state`, { method: 'GET', cache: 'no-store' });
      return { status: 'online', latencyMs: Date.now() - start };
    } catch {
      return { status: 'offline', latencyMs: -1 };
    }
  }

  // Auth Endpoints
  async login(email: string, password: string) {
    const res = await this.request<any>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.access_token) {
      this.setToken(res.access_token);
    }
    return res;
  }

  async register(username: string, email: string, password: string) {
    const res = await this.request<any>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    if (res.access_token) {
      this.setToken(res.access_token);
    }
    return res;
  }

  logout() {
    this.setToken(null);
  }

  // Fetch Full Game State from Database
  async getGameState() {
    return this.request<any>('/api/game/state');
  }

  // Equip Item
  async equipItem(cardId: string, slot: string, itemId: string) {
    return this.request<any>('/api/game/equip', {
      method: 'POST',
      body: JSON.stringify({ cardId, slot, itemId }),
    });
  }

  // Unequip Item
  async unequipItem(cardId: string, slot: string) {
    return this.request<any>('/api/game/unequip', {
      method: 'POST',
      body: JSON.stringify({ cardId, slot }),
    });
  }

  // Enhance Item
  async enhanceItem(itemId: string) {
    return this.request<any>('/api/inventory/enhance', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
    });
  }

  // Fuse 3 Items
  async fuseItems(itemIds: string[]) {
    return this.request<any>('/api/inventory/fuse', {
      method: 'POST',
      body: JSON.stringify({ itemIds }),
    });
  }

  // Dismantle Items
  async dismantleItems(itemIds: string[]) {
    return this.request<any>('/api/inventory/dismantle', {
      method: 'POST',
      body: JSON.stringify({ itemIds }),
    });
  }

  // Open Gacha Chest
  async openGachaChest(chestId: string, count = 1, idempotencyKey?: string) {
    return this.request<any>('/api/gacha/open', {
      method: 'POST',
      body: JSON.stringify({
        chestId,
        count,
        idempotencyKey: idempotencyKey || `gacha_${Date.now()}_${Math.random()}`,
      }),
    });
  }

  // Get Live Server Jackpot Pool
  async getJackpotPool() {
    return this.request<any>('/api/gacha/jackpot');
  }

  // Claim AFK Rewards
  async claimAfkRewards() {
    return this.request<any>('/api/afk/claim', {
      method: 'POST',
    });
  }

  // Get AFK Status
  async getAfkStatus() {
    return this.request<any>('/api/afk/status');
  }

  // Get World Bosses
  async getBosses() {
    return this.request<any>('/api/combat/bosses');
  }

  // Server Combat Attack
  async executeCombatAttack(cardId: string, bossId: string) {
    return this.request<any>('/api/combat/attack', {
      method: 'POST',
      body: JSON.stringify({ cardId, bossId }),
    });
  }
}

export const gameApi = new GameApiClient();
