# NGUYEN HUY LONG VU - 23671981 - https://github.com/huyvu2112005-ux/23671981_TH2.git- #698039 - So cuoi: 1 - VARIANT: Watermark Duoi | Login phone | Tab Shop->Gio->Toi | Haptic selection | Phi B | Detail card

## THỰC HÀNH 2 - KTXGo
- **Sinh viên:** NGUYỄN HUY LONG VŨ
- **MSSV:** 23671981
- **Lớp:** DHIOT19B
- **Mã Stamp:** #698039
- **Phòng giao:** P.281
- **GitHub Clone URL:** https://github.com/huyvu2112005-ux/23671981_TH2.git

### Cấu hình biến thể (Số cuối: 1)
- **Watermark:** Dưới (`watermarkAtTop: false`)
- **Ô Login:** `phone` (`authField: 'phone'`)
- **Thứ tự Tab:** `Shop -> Giỏ -> Tôi` (`tabOrder: 'shopFirst'`)
- **Haptic on Add:** `selection` (`hapticOnAdd: 'selection'`)
- **Công thức phí ship:** `Công thức B` (`BASE_SHIP_FEE + Math.round(km * 1500) + 2000`)
- **Detail Presentation:** `card` (`detailPresentation: 'card'`)
- **Hệ số giá:** `PRICE_MULTIPLIER = 25500`
- **Phí cơ bản:** `BASE_SHIP_FEE = 9000`
- **Debounce:** `DEBOUNCE_MS = 400ms`
- **React Query staleTime:** `STALE_TIME_MS = 11000ms`

### Cấu trúc Project
```
KTXGo_23671981/
├── README.md
├── App.tsx
├── package.json
├── babel.config.js
├── tsconfig.json
├── docs/
│   ├── screenshot-th2-home.png
│   └── screenshot-th2-cart.png
└── src/
    ├── constants/
    │   ├── student.ts
    │   └── theme.ts
    ├── hooks/
    │   ├── useCampusLocation.ts
    │   └── useDebouncedValue.ts
    ├── services/
    │   ├── apiClient.ts
    │   └── productApi.ts
    ├── stores/
    │   ├── authStore.ts
    │   └── cartStore.ts
    ├── navigation/
    │   ├── AuthStack.tsx
    │   ├── MainTabs.tsx
    │   ├── RootNavigator.tsx
    │   └── ShopStack.tsx
    ├── components/
    │   ├── ProductCard.tsx
    │   └── Watermark.tsx
    └── screens/
        ├── CartScreen.tsx
        ├── DetailScreen.tsx
        ├── HomeScreen.tsx
        ├── LoginScreen.tsx
        └── MeScreen.tsx
```

### Hướng dẫn chạy
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Chạy Metro Bundler:
   ```bash
   npm start
   ```
3. Chạy Android:
   ```bash
   npm run android
   ```
