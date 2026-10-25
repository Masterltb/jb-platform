# AGENTS.md — Quy Chuẩn Chung Dành Cho AI Coding Agents

> **Nền tảng**: Harness Engineering Framework (HEF v4.0.0)  
> **Dự án**: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ) — Solo Dev + AI Synergy

---

## 1. Nguyên Tắc Tối Cao & Constitution
Mọi quyết định thiết kế, kiến trúc và code bắt buộc phải tuân theo tập nguyên tắc bất biến:
- 📖 **Constitution Bắt Buộc**: Đọc [harness-engineering/CONSTITUTION.md](file:///f:/project/repo-github/JaeBinPlatform/harness-engineering/CONSTITUTION.md) trước khi thực hiện bất kỳ thay đổi nào.
- 🎯 **Docs là Nguồn Sự Thật**: Mọi tính năng phải có spec tại `docs/01-specs/FEAT-XXX.md`. Tuyệt đối không code khi chưa có spec được phê duyệt.
- 🔒 **Bảo Mật Giao Dịch**: Server-side AFK calculation, Idempotency cho Giftcode và Nạp thẻ; Never trust the client.

---

## 2. Phân Luồng Rủi Ro (Risk Lanes) & Multi-Role Review

| Risk Lane | Tiêu chí áp dụng | Yêu cầu kiểm soát |
| :--- | :--- | :--- |
| `tiny` | Sửa docs, cập nhật spec markdown, chỉnh typo | Tự động pass, không cần review đa vai trò. |
| `normal` | Viết tính năng game mới, UI Web Portal, logic item | Bắt buộc chạy qua Story Packet + 4/7 Specialist Roles pass. |
| `high_risk` | Auth, Nạp tiền, Thanh toán, AFK Anti-cheat, DB Migration | Bắt buộc có Failure Memory + Devil's Advocate pass + Người duyệt. |

> Chi tiết 7 vai trò review: Xem [harness-engineering/roles/ROLE_SYSTEM.md](file:///f:/project/repo-github/JaeBinPlatform/harness-engineering/roles/ROLE_SYSTEM.md).

---

## 3. Bảng Phân Quyền Surface & Lệnh Thực Thi

Khi làm việc trong từng thư mục cụ thể, **BẮT BUỘC** đọc file `AGENTS.md` của surface đó:

| Surface | Vị trí thư mục | Surface AGENTS File | Stack Pack |
| :--- | :--- | :--- | :--- |
| **Web Card Game & Portal** | `apps/web-portal/` | [apps/web-portal/AGENTS.md](file:///f:/project/repo-github/JaeBinPlatform/apps/web-portal/AGENTS.md) | `frontend/react.md` |
| **Game Backend** | `services/game-backend/` | [services/game-backend/AGENTS.md](file:///f:/project/repo-github/JaeBinPlatform/services/game-backend/AGENTS.md) | `backend/node.md` |
| **Mobile Client (PWA/Wrapper)** | `apps/mobile-client/` | [apps/mobile-client/AGENTS.md](file:///f:/project/repo-github/JaeBinPlatform/apps/mobile-client/AGENTS.md) | `mobile/unity.md` |
| **Harness Engine**| `harness-engineering/`| [harness-engineering/README.md](file:///f:/project/repo-github/JaeBinPlatform/harness-engineering/README.md) | `core/HARNESS.md` |

---

## 4. Công Cụ Harness CLI

Sử dụng bộ công cụ `harness-cli` (Python 3.9+ stdlib, không phụ thuộc binary ngoài):
```bash
# Phân loại yêu cầu mới (Intake)
python harness-engineering/scripts/harness_cli.py intake --type new_spec --summary "FEAT-001 Combat Style" --lane normal

# Thêm và nghiệm thu User Story
python harness-engineering/scripts/harness_cli.py story add --id US-001 --title "Combat 3-hit combo" --lane normal
python harness-engineering/scripts/harness_cli.py story verify US-001 --command "npm test" --result pass

# Ghi lại Trace và kiểm tra ma trận tiến độ
python harness-engineering/scripts/harness_cli.py trace --summary "Hoàn thành spec FEAT-001" --outcome completed
python harness-engineering/scripts/harness_cli.py query matrix
```
