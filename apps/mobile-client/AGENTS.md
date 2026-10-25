# Mobile Client (Unity 2D ARPG) — Agent Instructions

## Stack
- **Engine**: Unity 2D (URP - Universal Render Pipeline)
- **Language**: C# (.NET Standard 2.1)
- **Stack Pack**: Trỏ tới `harness-engineering/stack-packs/mobile/unity.md`

## Commands
| Action | Command |
|---|---|
| Analyze / Format | `dotnet format --verify-no-changes` |
| Test (EditMode) | Unity batchmode test runner (xem stack-pack) |
| Build Android Debug | Unity batchmode BuildScript (xem stack-pack) |

## Surface-Specific Rules
1. **Model-View-Presenter (MVP)**:
   - Tách biệt logic thuần C# (`CombatCalculator.cs`, `CombatStats.cs`) khỏi MonoBehaviour.
   - MonoBehaviour (`PlayerView.cs`, `VfxManager.cs`) chỉ xử lý hiển thị, âm thanh và animation.
2. **Game Juice & Feel Bắt Buộc**:
   - Mọi đòn đánh trúng địch phải có: `Hit Stop` (ngưng hình 0.04s - 0.08s), `Camera Shake` và `Trail Renderer`.
3. **Hiệu Năng Mobile (Zero GC Spike)**:
   - Cấm cấp phát bộ nhớ động trong vòng lặp `Update()` / `FixedUpdate()`.
   - Bắt buộc dùng `Object Pooling` cho quái, đạn và số nhảy sát thương.
4. **Offline Sync & Anti-Cheat**:
   - Không tự ý tăng tiền hoặc vật phẩm phía client khi nhận quà AFK; phải đợi response từ Backend API.

## Quality Gates
Xem `harness-engineering/quality-gates/mobile-gates.md`.

## Read These First
- Đặc tả combat & style: [docs/01-specs/FEAT-001-combat-style.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-001-combat-style.md)
- Đặc tả treo máy: [docs/01-specs/FEAT-002-afk-idle-boss.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-002-afk-idle-boss.md)
- Pipeline sản xuất hình ảnh: [docs/03-art-pipeline/art-pipeline-guide.md](file:///f:/project/repo-github/JaeBinPlatform/docs/03-art-pipeline/art-pipeline-guide.md)
