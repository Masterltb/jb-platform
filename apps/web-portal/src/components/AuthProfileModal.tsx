'use client';

import React, { useState, useEffect } from 'react';
import { X, Server, ShieldCheck, UserCheck, Key, LogIn, UserPlus, RefreshCw, Database, Award, Zap, Coins } from 'lucide-react';
import { gameApi } from '@/services/gameApiClient';
import { sound } from '@/utils/soundEffects';

interface AuthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    username: string;
    email: string;
    gold: number;
    diamonds: number;
    level?: number;
    vipLevel?: number;
  };
  serverStatus: 'online' | 'offline' | 'checking';
  latencyMs: number;
  onUserChange: () => void;
}

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  serverStatus,
  latencyMs,
  onUserChange,
}) => {
  const [tab, setTab] = useState<'profile' | 'login' | 'register'>('profile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await gameApi.login(email, password);
      sound.playBuffSound();
      setMsg({ type: 'success', text: `Đăng nhập thành công! Chào mừng ${res.user.username}.` });
      setTimeout(() => {
        onUserChange();
        setTab('profile');
      }, 700);
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await gameApi.register(username, email, password);
      sound.playBuffSound();
      setMsg({ type: 'success', text: `Khởi tạo nhân vật thành công! Chào mừng ${res.user.username}.` });
      setTimeout(() => {
        onUserChange();
        setTab('profile');
      }, 700);
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Đăng ký thất bại. Email hoặc tài khoản đã tồn tại.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToMaster = async () => {
    setLoading(true);
    gameApi.logout();
    onUserChange();
    setMsg({ type: 'success', text: 'Đã chuyển về tài khoản Master mặc định (JaeBinMaster).' });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e121d] border-4 border-[#00f0ff] p-5 shadow-[8px_8px_0_#000] text-white space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#00f0ff] border-2 border-black flex items-center justify-center text-black font-black">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider text-[#00f0ff]">
                TRUNG TÂM HỆ THỐNG & TÀI KHOẢN
              </h2>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      serverStatus === 'online'
                        ? 'bg-emerald-400 animate-pulse'
                        : serverStatus === 'checking'
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                  />
                  {serverStatus === 'online'
                    ? `LIVE DB (Fastify :3001 • ${latencyMs}ms)`
                    : serverStatus === 'checking'
                    ? 'Đang kiểm tra kết nối...'
                    : 'OFFLINE / Local Fallback'}
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-amber-400">HN-S1-PHỐ-CỔ</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playCardWhoosh();
              onClose();
            }}
            className="p-1.5 bg-[#1a2030] hover:bg-[#ff0055] border-2 border-black text-white shadow-[2px_2px_0_#000] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 gap-2 bg-[#080b12] p-1 border-2 border-black">
          <button
            onClick={() => {
              setTab('profile');
              setMsg(null);
            }}
            className={`py-1.5 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 ${
              tab === 'profile'
                ? 'bg-[#00f0ff] text-black shadow-[2px_2px_0_#000]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Hồ Sơ</span>
          </button>
          <button
            onClick={() => {
              setTab('login');
              setMsg(null);
            }}
            className={`py-1.5 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 ${
              tab === 'login'
                ? 'bg-[#10ffa0] text-black shadow-[2px_2px_0_#000]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng Nhập</span>
          </button>
          <button
            onClick={() => {
              setTab('register');
              setMsg(null);
            }}
            className={`py-1.5 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 ${
              tab === 'register'
                ? 'bg-[#ff0055] text-white shadow-[2px_2px_0_#000]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng Ký</span>
          </button>
        </div>

        {/* Alerts */}
        {msg && (
          <div
            className={`p-2.5 border-2 border-black text-xs font-bold ${
              msg.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                : 'bg-rose-950/80 text-rose-300 border-rose-500'
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* Tab 1: Profile */}
        {tab === 'profile' && (
          <div className="space-y-3">
            <div className="bg-[#141926] border-2 border-black p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Tên Cao Thủ</span>
                  <p className="text-base font-black text-white flex items-center gap-2">
                    {currentUser.username || 'JaeBinMaster'}
                    <span className="bg-[#ff0055] text-white text-[10px] px-1.5 py-0.2 font-black border border-black">
                      VIP {currentUser.vipLevel || 8}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Cấp Độ</span>
                  <p className="text-base font-black text-[#00f0ff]">Lv.{currentUser.level || 50}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-1.5 bg-[#0b0e17] p-2 border border-black">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Ví Vàng</span>
                    <span className="text-amber-300 font-bold">{currentUser.gold.toLocaleString()} 🪙</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0b0e17] p-2 border border-black">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Kim Cương</span>
                    <span className="text-cyan-300 font-bold">{currentUser.diamonds.toLocaleString()} 💎</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="bg-[#0b0e17] border-2 border-black p-3 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                <span>Backend Techstack & Data Architecture:</span>
              </div>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                <li>Server Engine: <strong className="text-white">NestJS 11 + Fastify</strong> (Non-blocking I/O)</li>
                <li>ORM & DB: <strong className="text-white">Prisma 6.5 + PostgreSQL / SQLite</strong></li>
                <li>Authentication: <strong className="text-white">JWT Bearer Token + Idempotency Guard</strong></li>
                <li>Server Authority: Sát thương Boss, Drop rate Gacha, Tích lũy AFK tính toán 100% tại Server.</li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleSwitchToMaster}
                disabled={loading}
                className="px-3 py-2 bg-[#1e293b] hover:bg-[#334155] border-2 border-black text-xs font-bold text-slate-200 shadow-[2px_2px_0_#000] active:translate-x-0.5"
              >
                Tải Lại Tài Khoản Master
              </button>
              <button
                onClick={() => {
                  sound.playCardWhoosh();
                  onClose();
                }}
                className="px-4 py-2 bg-[#00f0ff] hover:bg-cyan-300 border-2 border-black text-xs font-black text-black shadow-[2px_2px_0_#000] active:translate-x-0.5"
              >
                Xác Nhận & Đóng
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Login */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email Tài Khoản</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="master@jaebin.com"
                className="w-full bg-[#080b12] border-2 border-black p-2 text-xs text-white focus:border-[#00f0ff] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Mật Khẩu</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#080b12] border-2 border-black p-2 text-xs text-white focus:border-[#00f0ff] outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              * Tài khoản mặc định: <span className="text-[#00f0ff]">master@jaebin.com</span> / Mật khẩu: <span className="text-[#00f0ff]">jaebin2026</span>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#10ffa0] hover:bg-emerald-400 text-black font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Ngay'}</span>
            </button>
          </form>
        )}

        {/* Tab 3: Register */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Tên Nhân Vật (Ingame)</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="VD: KiếmThầnPhốCổ"
                className="w-full bg-[#080b12] border-2 border-black p-2 text-xs text-white focus:border-[#ff0055] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="player@gmail.com"
                className="w-full bg-[#080b12] border-2 border-black p-2 text-xs text-white focus:border-[#ff0055] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Mật Khẩu</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full bg-[#080b12] border-2 border-black p-2 text-xs text-white focus:border-[#ff0055] outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#ff0055] hover:bg-rose-600 text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Đang tạo nhân vật...' : 'Tạo Tài Khoản & Vào Game'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
