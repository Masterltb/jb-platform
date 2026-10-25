import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, username: string, password: string) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      throw new BadRequestException('Email hoặc Username đã tồn tại trong hệ thống!');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        gold: BigInt(500000),
        diamonds: 1500,
        energy: 5,
        maxEnergy: 5,
        totalCp: BigInt(785200),
      },
    });

    // Initialize AFK session
    await this.prisma.afkSession.create({
      data: {
        userId: user.id,
        lastClaimedAt: new Date(),
        rateGoldPerSec: 35,
        rateExpPerSec: 15,
      },
    });

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        gold: Number(user.gold),
        diamonds: user.diamonds,
        energy: user.energy,
        totalCp: Number(user.totalCp),
      },
    };
  }

  async login(usernameOrEmail: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });
    if (!user) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác!');
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác!');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        gold: Number(user.gold),
        diamonds: user.diamonds,
        energy: user.energy,
        totalCp: Number(user.totalCp),
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      gold: Number(user.gold),
      diamonds: user.diamonds,
      energy: user.energy,
      maxEnergy: user.maxEnergy,
      totalCp: Number(user.totalCp),
    };
  }
}
