const fs = require('fs');
const path = require('path');

const structure = {
  api: [
    'axios.ts',
    'account.api.ts',
    'brand.api.ts',
    'cart.api.ts',
    'category.api.ts',
    'color.api.ts',
    'product.api.ts',
    'subCategory.api.ts',
    'userProfile.api.ts',
  ],
  types: [
    'account.ts',
    'brand.ts',
    'cart.ts',
    'category.ts',
    'color.ts',
    'product.ts',
    'subCategory.ts',
    'userProfile.ts',
  ],
  queries: [
    'account.query.ts',
    'brand.query.ts',
    'cart.query.ts',
    'category.query.ts',
    'color.query.ts',
    'product.query.ts',
    'subCategory.query.ts',
    'userProfile.query.ts',
  ],
  store: ['cart.store.ts', 'auth.store.ts', 'ui.store.ts'],
  components: [
    'Header/Header.tsx',
    'Footer/Footer.tsx',
    'ProductCard/ProductCard.tsx',
    'BrandCard/BrandCard.tsx',
    'CategoryCard/CategoryCard.tsx',
    'Modal/Modal.tsx',
  ],
  pages: [
    'Home/Home.tsx',
    'Catalog/Catalog.tsx',
    'Product/Product.tsx',
    'Cart/Cart.tsx',
    'Account/Login.tsx',
    'Account/Register.tsx',
    'Brand/BrandList.tsx',
    'Category/CategoryList.tsx',
    'UserProfile/Profile.tsx',
  ],
  router: ['router.tsx'],
  rootFiles: ['App.tsx', 'main.tsx'],
};

function createFiles(base, structure) {
  if (!fs.existsSync(base)) fs.mkdirSync(base);

  for (const folder in structure) {
    const folderPath = path.join(base, folder === 'rootFiles' ? '' : folder);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

    structure[folder].forEach((file) => {
      const filePath = path.join(folderPath, file);
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '');
    });
  }
}

createFiles(path.join(__dirname, 'src'), structure);

console.log('Структура H-Tech Market создана!');
