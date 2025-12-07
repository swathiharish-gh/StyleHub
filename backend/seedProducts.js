const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const products = [
  // ========== MEN'S WEAR ==========

  // Men - Tops/Casual
  {
    name: 'Classic Black T-Shirt',
    description: 'Premium cotton t-shirt perfect for everyday wear. Breathable and comfortable.',
    price: 999,
    discountPrice: 799,
    images: {
      Black: [
        'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
        'https://images.pexels.com/photos/8532638/pexels-photo-8532638.jpeg'
      ],
      White: [
        'https://images.pexels.com/photos/12650794/pexels-photo-12650794.jpeg',
        'https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg'
      ]
    },
    category: 'Men',
    subcategory: 'Casual',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    stock: 100,
    brand: 'StyleHub',
    material: '100% Cotton',
    isBestseller: true,
    ratings: 4.5,
    numReviews: 25
  },

  {
    name: 'Striped Polo Shirt',
    description: 'Elegant polo shirt with horizontal stripes. Perfect for casual outings.',
    price: 1499,
    discountPrice: 1199,
    images: [
      'https://images.pexels.com/photos/17035524/pexels-photo-17035524.png',
      'https://images.pexels.com/photos/28222811/pexels-photo-28222811.jpeg',
      'https://images.pexels.com/photos/17035519/pexels-photo-17035519.png'
    ],
    category: 'Men',
    subcategory: 'Casual',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black'],
    stock: 75,
    brand: 'StyleHub',
    material: 'Cotton Blend',
    ratings: 4.3,
    numReviews: 18
  },

  {
    name: 'Premium White Shirt',
    description: 'Crisp white formal shirt for office and events.',
    price: 1999,
    discountPrice: 1599,
    images: [
      'https://images.pexels.com/photos/3214769/pexels-photo-3214769.jpeg',
      'https://images.pexels.com/photos/3214768/pexels-photo-3214768.jpeg',
    ],
    category: 'Men',
    subcategory: 'Formal',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Default'],
    stock: 60,
    brand: 'StyleHub',
    material: 'Cotton',
    isBestseller: true,
    ratings: 4.7,
    numReviews: 32
  },

  // Men - Bottoms
  {
    name: 'Slim Fit Jeans',
    description: 'Classic denim jeans with a modern slim fit.',
    price: 2499,
    discountPrice: 1999,
    images: {
      Blue: [
        'https://images.pexels.com/photos/1701207/pexels-photo-1701207.jpeg',
        'https://images.pexels.com/photos/1701193/pexels-photo-1701193.jpeg'
      ],
      Black: [
        'https://images.pexels.com/photos/3669737/pexels-photo-3669737.jpeg',
        'https://images.pexels.com/photos/4505790/pexels-photo-4505790.jpeg'
      ]
    },
    category: 'Men',
    subcategory: 'Casual',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black'],
    stock: 80,
    brand: 'StyleHub',
    material: 'Denim',
    isBestseller: true,
    ratings: 4.6,
    numReviews: 45
  },

  {
    name: 'Formal Trousers',
    description: 'Smart formal trousers for office and business meetings.',
    price: 2199,
    discountPrice: 1799,
    images: {
      Black: [
        'https://images.pexels.com/photos/5163380/pexels-photo-5163380.jpeg',
        'https://images.pexels.com/photos/31956958/pexels-photo-31956958.jpeg',
        'https://images.pexels.com/photos/7644078/pexels-photo-7644078.jpeg',
        'https://images.pexels.com/photos/8453953/pexels-photo-8453953.jpeg'
      ],
      Grey: [
        'https://images.pexels.com/photos/8121821/pexels-photo-8121821.jpeg',
        'https://images.pexels.com/photos/13801511/pexels-photo-13801511.jpeg'
      ]
    },
    category: 'Men',
    subcategory: 'Formal',
    sizes: ['30', '32', '34', '36'],
    colors: ['Black', 'Grey'],
    stock: 65,
    brand: 'StyleHub',
    material: 'Polyester Blend',
    ratings: 4.4,
    numReviews: 28
  },

  // Men - Traditional
  {
    name: 'Cotton Kurta Set',
    description: 'Traditional cotton kurta with pajama. Perfect for festivals and occasions.',
    price: 2999,
    discountPrice: 2499,
    images: {
      Black: [
        'https://images.pexels.com/photos/8770958/pexels-photo-8770958.jpeg',
        'https://images.pexels.com/photos/8770948/pexels-photo-8770948.jpeg',
        'https://images.pexels.com/photos/8770946/pexels-photo-8770946.jpeg'
      ],
      Green: [
        'https://images.pexels.com/photos/13624143/pexels-photo-13624143.jpeg'
      ],
      LightBlue: [
        'https://images.pexels.com/photos/8818722/pexels-photo-8818722.jpeg',
        'https://images.pexels.com/photos/8818641/pexels-photo-8818641.jpeg',
        'https://images.pexels.com/photos/8818726/pexels-photo-8818726.jpeg'
      ]
    },
    category: 'Men',
    subcategory: 'Traditional',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Green', 'LightBlue'],
    stock: 45,
    brand: 'StyleHub',
    material: 'Cotton',
    ratings: 4.5,
    numReviews: 22
  },

  // ========== WOMEN'S WEAR ==========

  {
    name: 'Floral Print Top',
    description: 'Beautiful floral print top perfect for summer. Light and breezy.',
    price: 1299,
    discountPrice: 999,
    images: {
      Pink: [
        'https://images.pexels.com/photos/12494233/pexels-photo-12494233.jpeg',
        'https://images.pexels.com/photos/12494232/pexels-photo-12494232.jpeg'
      ]
    },
    category: 'Women',
    subcategory: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink'],
    stock: 90,
    brand: 'StyleHub',
    material: 'Cotton',
    isBestseller: true,
    ratings: 4.8,
    numReviews: 56
  },

  {
    name: 'Crop Top',
    description: 'Crop tops for casual wear.',
    price: 1799,
    discountPrice: 1399,
    images: {
      Black: [
        'https://images.pexels.com/photos/35051816/pexels-photo-35051816.jpeg',
        'https://images.pexels.com/photos/35051820/pexels-photo-35051820.jpeg'
      ],
      White: [
        'https://images.pexels.com/photos/3334783/pexels-photo-3334783.jpeg',
        'https://images.pexels.com/photos/3335348/pexels-photo-3335348.jpeg',
        'https://images.pexels.com/photos/3334775/pexels-photo-3334775.jpeg'
      ]
    },
    category: 'Women',
    subcategory: 'Formal',
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'White'],
    stock: 70,
    brand: 'StyleHub',
    material: 'Polyester',
    ratings: 4.6,
    numReviews: 34
  },

  {
    name: 'High Waist Jeans',
    description: 'Trendy high waist jeans with perfect fit and comfort.',
    price: 2299,
    discountPrice: 1899,
    images: ['https://images.pexels.com/photos/7880062/pexels-photo-7880062.jpeg'],
    category: 'Women',
    subcategory: 'Casual',
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Default'],
    stock: 85,
    brand: 'StyleHub',
    material: 'Denim',
    isBestseller: true,
    ratings: 4.7,
    numReviews: 67
  },

  {
    name: 'Palazzo Pants',
    description: 'Comfortable palazzo pants for casual and semi-formal wear.',
    price: 1499,
    discountPrice: 1199,
    images: ['https://images.pexels.com/photos/7690965/pexels-photo-7690965.jpeg'],
    category: 'Women',
    subcategory: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Default'],
    stock: 75,
    brand: 'StyleHub',
    material: 'Rayon',
    ratings: 4.5,
    numReviews: 41
  },

  {
    name: 'Silk Saree',
    description: 'Elegant silk saree perfect for weddings and special occasions.',
    price: 4999,
    discountPrice: 3999,
    images: {
      Orange: [
        'https://images.pexels.com/photos/28943499/pexels-photo-28943499.jpeg',
        'https://images.pexels.com/photos/28943502/pexels-photo-28943502.jpeg',
        'https://images.pexels.com/photos/28943616/pexels-photo-28943616.jpeg',
        'https://images.pexels.com/photos/28943484/pexels-photo-28943484.jpeg'
      ],
      Red: [
        'https://images.pexels.com/photos/28943543/pexels-photo-28943543.jpeg',
        'https://images.pexels.com/photos/28943544/pexels-photo-28943544.jpeg'
      ]
    },
    category: 'Women',
    subcategory: 'Traditional',
    sizes: ['Free Size'],
    colors: ['Orange', 'Red'],
    stock: 35,
    brand: 'StyleHub',
    material: 'Silk',
    isBestseller: true,
    ratings: 4.9,
    numReviews: 78
  },

  {
    name: 'Cotton Kurti',
    description: 'Comfortable cotton kurti for daily wear. Stylish and breathable.',
    price: 1299,
    discountPrice: 999,
    images: ['https://images.pexels.com/photos/28213774/pexels-photo-28213774.jpeg'],
    category: 'Women',
    subcategory: 'Traditional',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Default'],
    stock: 95,
    brand: 'StyleHub',
    material: 'Cotton',
    isBestseller: true,
    ratings: 4.6,
    numReviews: 89
  },

  {
    name: 'Business Suit Set',
    description: 'Professional business suit for corporate women.',
    price: 4999,
    discountPrice: 3999,
    images: {
      NavyBlue: ['https://images.pexels.com/photos/6474585/pexels-photo-6474585.jpeg'],
      White: [
        'https://images.pexels.com/photos/30468654/pexels-photo-30468654.jpeg',
        'https://images.pexels.com/photos/30468656/pexels-photo-30468656.jpeg'
      ],
      Red: ['https://images.pexels.com/photos/2040396/pexels-photo-2040396.jpeg'],
      Pink: [
        'https://images.pexels.com/photos/18271575/pexels-photo-18271575.jpeg',
        'https://images.pexels.com/photos/18781295/pexels-photo-18781295.jpeg'
      ]
    },
    category: 'Women',
    subcategory: 'Formal',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['NavyBlue', 'White', 'Red', 'Pink'],
    stock: 40,
    brand: 'StyleHub',
    material: 'Polyester Blend',
    ratings: 4.7,
    numReviews: 52
  },

  // ========== KIDS' WEAR ==========

  {
    name: 'Kids Cartoon T-Shirt',
    description: 'Fun cartoon printed t-shirt for kids. Soft and comfortable.',
    price: 599,
    discountPrice: 449,
    images: {
      Orange: ['https://images.pexels.com/photos/8798738/pexels-photo-8798738.jpeg'],
      Grey: ['https://images.pexels.com/photos/34590865/pexels-photo-34590865.jpeg'],
      Yellow: ['https://images.pexels.com/photos/28644641/pexels-photo-28644641.jpeg'],
      White: ['https://images.pexels.com/photos/17164597/pexels-photo-17164597.jpeg']
    },
    category: 'Kids',
    subcategory: 'Casual',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Orange', 'Grey', 'Yellow', 'White'],
    stock: 120,
    brand: 'StyleHub',
    material: 'Cotton',
    isBestseller: true,
    ratings: 4.8,
    numReviews: 95
  },

  {
    name: 'Girls Party Dress',
    description: 'Beautiful party dress for little princesses. Perfect for celebrations.',
    price: 1499,
    discountPrice: 1199,
    images: ['https://images.pexels.com/photos/32921518/pexels-photo-32921518.jpeg'],
    category: 'Kids',
    subcategory: 'Formal',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Default'],
    stock: 55,
    brand: 'StyleHub',
    material: 'Cotton Blend',
    ratings: 4.9,
    numReviews: 67
  },

  {
    name: 'Kids Denim Shorts',
    description: 'Comfortable denim shorts for active kids.',
    price: 799,
    discountPrice: 599,
    images: {
      Blue: ['https://images.pexels.com/photos/7388498/pexels-photo-7388498.jpeg'],
      Skin: ['https://images.pexels.com/photos/3876060/pexels-photo-3876060.jpeg']
    },
    category: 'Kids',
    subcategory: 'Casual',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Blue', 'Skin'],
    stock: 90,
    brand: 'StyleHub',
    material: 'Denim',
    ratings: 4.5,
    numReviews: 48
  },

  {
    name: 'Boys Kurta Pajama Set',
    description: 'Traditional kurta pajama for boys. Perfect for festivals.',
    price: 1299,
    discountPrice: 999,
    images: ['https://images.pexels.com/photos/20669592/pexels-photo-20669592.jpeg'],
    category: 'Kids',
    subcategory: 'Traditional',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Default'],
    stock: 65,
    brand: 'StyleHub',
    material: 'Cotton',
    ratings: 4.6,
    numReviews: 34
  },

  {
    name: 'Kids Sports T-Shirt',
    description: 'Breathable sports t-shirt for active kids.',
    price: 699,
    discountPrice: 549,
    images: {
      Black: ['https://images.pexels.com/photos/7201152/pexels-photo-7201152.jpeg'],
      White: [
        'https://images.pexels.com/photos/7186292/pexels-photo-7186292.jpeg',
        'https://images.pexels.com/photos/7186612/pexels-photo-7186612.jpeg'
      ],
      Orange: [
        'https://images.pexels.com/photos/7201559/pexels-photo-7201559.jpeg',
        'https://images.pexels.com/photos/7201146/pexels-photo-7201146.jpeg'
      ]
    },
    category: 'Kids',
    subcategory: 'Sportswear',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Black', 'White', 'Orange'],
    stock: 80,
    brand: 'StyleHub',
    material: 'Polyester',
    ratings: 4.4,
    numReviews: 29
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log('Successfully seeded products!');
    console.log(`Total products added: ${products.length}`);

    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
