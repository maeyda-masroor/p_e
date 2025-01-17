import axios from "axios";
async function findOrCreateCategory(name, imageUrl) {
    try {
      // Check if the category already exists
      const existingCategory = await client.fetch(
        `*[_type == "category" && name == $name][0]`,
        { name }
      );
  
      if (existingCategory) {
        console.log(`Category "${name}" already exists: ${existingCategory._id}`);
        return existingCategory._id;
      }
  
      // Upload the category image to Sanity
      let imageRef = null;
      if (imageUrl) {
        imageRef = await uploadImageToSanity(imageUrl);
      }
  
      // Create a new category
      const category = {
        _type: 'category',
        name,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };
  
      const result = await client.create(category);
      console.log(`Category created: ${result._id}`);
      return result._id;
    } catch (error) {
      console.error('Error creating category:', name, error);
      return null;
    }
  }
  
  async function importData() {
    try {
      console.log('Fetching products from API...');
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
      console.log(`Fetched ${products.length} products`);
  
      for (const product of products) {
        console.log(`Processing product: ${product.title}`);
  
        // Create or find the category
        const categoryId = await findOrCreateCategory(product.category, product.image);
  
        // Upload the product image
        let imageRef = null;
        if (product.image) {
          imageRef = await uploadImageToSanity(product.image);
        }
  
        // Create the product document
        const sanityProduct = {
          _type: 'product',
          name: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: 0,
          priceWithoutDiscount: product.price,
          rating: product.rating?.rate || 0,
          ratingCount: product.rating?.count || 0,
          tags: product.category ? [product.category] : [],
          sizes: [],
          image: imageRef
            ? {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageRef,
                },
              }
            : undefined,
          category: {
            _type: 'reference',
            _ref: categoryId,
          },
        };
  
        console.log('Uploading product to Sanity:', sanityProduct.name);
        const result = await client.create(sanityProduct);
        console.log(`Product uploaded successfully: ${result._id}`);
      }
  
      console.log('Data import completed successfully!');
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }
  
  importData();
  