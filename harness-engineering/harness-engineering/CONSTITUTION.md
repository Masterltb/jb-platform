# Project Constitution

> Tương đương `constitution.md` (Spec Kit) / `project-context.md` (BMAD). Đây là tập
> nguyên tắc **bất biến, hiếm khi đổi** — mọi artifact khác (PRD, Architecture, story,
> code) phải nhất quán với file này. Nếu 1 quyết định mâu thuẫn với Constitution, đó là
> tín hiệu để dừng lại và bàn bạc lại với người quyết định (không phải agent tự sửa
> Constitution để hợp thức hoá quyết định).
>
> Khác với `AGENTS.md` (hướng dẫn thao tác — có thể sửa thường xuyên khi quy trình cải
> tiến) và `discovery/` (artifact riêng cho từng initiative — sinh ra và có thể lỗi thời),
> Constitution mô tả **dự án này LÀ GÌ và KHÔNG BAO GIỜ ĐƯỢC làm gì**, viết một lần, review
> lại khi có thay đổi chiến lược thực sự (không phải mỗi feature).

> ⚠️ File mẫu — team/agent cần điền phần này khi khởi tạo dự án. Xem `discovery/README.md`
> để biết Constitution nằm ở đâu trong luồng Discovery → Planning → Solutioning Gate.

## 1. Mission
<1 câu: dự án này tồn tại để làm gì>

## 2. Non-negotiables (KHÔNG được vi phạm dù bất kỳ lý do gì)
- <vd: Không bao giờ lưu plaintext password>
- <vd: Không bao giờ gọi API bên thứ ba từ client — luôn qua backend proxy>
- <vd: Mọi migration DB phải reversible>

## 3. Explicitly out of scope
- <điều dự án này CHỦ ĐỘNG không làm, để tránh scope creep khi agent "muốn giúp thêm">

## 4. Decision authority
- Ai có quyền quyết định cuối cùng khi Solutioning Gate trả `concerns`/`fail`?
- Ai có quyền sửa chính file Constitution này? (thường: không phải agent tự động)

## 5. Tham chiếu bắt buộc
- `AGENTS.md` (root) — hướng dẫn thao tác hàng ngày, phải nhất quán với Constitution này.
- `compliance/COMPLIANCE_FRAMEWORK.md` + `compliance/domain-packs/<domain>.md` nếu có.
- `discovery/README.md` — nơi Constitution được dùng làm tiêu chí Solutioning Gate.
