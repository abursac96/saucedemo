export interface Product {
    name: string;
    price: string;
    description: string;
    alt: string;
    src: string;
}

export const productsData = [
    {
        name: 'Sauce Labs Backpack',
        price: '$29.99',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        alt: 'Sauce Labs Backpack',
        src: '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg',
    },
    {
        name: 'Sauce Labs Bike Light',
        price: '$9.99',
        description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
        alt: 'Sauce Labs Bike Light',
        src: '/static/media/bike-light-1200x1500.37c843b0.jpg',
    },
    {
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99',
        description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
        alt: 'Sauce Labs Bolt T-Shirt',
        src: '/static/media/bolt-shirt-1200x1500.c2599ac5.jpg',
    },
    {
        name: 'Sauce Labs Fleece Jacket',
        price: '$49.99',
        description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
        alt: 'Sauce Labs Fleece Jacket',
        src: '/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg',
    },
    {
        name: 'Sauce Labs Onesie',
        price: '$7.99',
        description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
        alt: 'Sauce Labs Onesie',
        src: '/static/media/red-onesie-1200x1500.2ec615b2.jpg',
    },
    {
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: '$15.99',
        description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
        alt: 'Test.allTheThings() T-Shirt (Red)',
        src: '/static/media/red-tatt-1200x1500.30dadef4.jpg',
    },
];

export function sortProductsAZ(): Product[] {
    return [...productsData].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortProductsZA(): Product[] {
    return [...productsData].sort((a, b) => b.name.localeCompare(a.name));
}

export function sortProductsByPriceLowToHigh(): Product[] {
    return [...productsData].sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
}

export function sortProductsByPriceHighToLow(): Product[] {
    return [...productsData].sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
}