// src/data/restaurants.js
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg";

export const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: image1, rating: 4.8, orders: 1200, price: 650, street: "Ogo Oluwa", time: "25-30 min" },
  { id: 2, name: "The Place", image: "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220", rating: 4.9, orders: 1500, price: 700, street: "Igbona", time: "15-20 min" },
  { id: 3, name: "Chicken Republic Branch", image: image1, rating: 4.5, orders: 800, price: 550, street: "Igbona", time: "20-25 min" },
  { id: 4, name: "Yakoyo", image: image2, rating: 4.7, orders: 1100, price: 600, street: "Estate", time: "20-25 min" },
];

// Bulky menus with multiple categories
export const restaurantMenus = {
  1: [
    { id: 1, name: "Chicken Wings (6pcs)", price: 1200, description: "Spicy crispy chicken wings.", category: "Starters" },
    { id: 2, name: "Garlic Bread", price: 500, description: "Toasted bread with garlic butter.", category: "Starters" },
    { id: 3, name: "Mozzarella Sticks", price: 700, description: "Cheesy fried sticks.", category: "Starters" },
    { id: 4, name: "Chicken Burger", price: 1500, description: "Juicy chicken patty with lettuce, tomato, and mayo.", category: "Main Menu" },
    { id: 5, name: "Chicken Wrap", price: 1000, description: "Grilled chicken wrapped in a soft tortilla with veggies.", category: "Main Menu" },
    { id: 6, name: "Fried Chicken (2pcs)", price: 1200, description: "Crispy fried chicken with sauce.", category: "Proteins" },
    { id: 7, name: "Grilled Chicken (1pc)", price: 800, description: "Grilled chicken with herbs and spices.", category: "Proteins" },
    { id: 8, name: "Jollof Rice", price: 1200, description: "Flavored rice cooked with tomato and spices.", category: "Rice" },
    { id: 9, name: "Fried Rice", price: 1200, description: "Rice stir-fried with vegetables.", category: "Rice" },
    { id: 10, name: "French Fries", price: 500, description: "Crispy golden fries.", category: "Sides" },
    { id: 11, name: "Coleslaw", price: 400, description: "Fresh cabbage and carrot salad.", category: "Sides" },
    { id: 12, name: "Coca Cola", price: 300, description: "Refreshing cold drink.", category: "Drinks" },
    { id: 13, name: "Chocolate Cake Slice", price: 700, description: "Rich chocolate cake.", category: "Desserts" },
    { id: 14, name: "BBQ Sauce", price: 200, description: "Smoky BBQ sauce.", category: "Sauces" },
    { id: 15, name: "Family Feast", price: 5500, description: "4pcs fried chicken, large fries, 2 rice portions, 4 drinks.", category: "Specials" },
  ],
  2: [
    { id: 1, name: "Spaghetti Bolognese", price: 1500, description: "Classic Italian pasta with meat sauce.", category: "Main Menu" },
    { id: 2, name: "Grilled Chicken", price: 1800, description: "Tender grilled chicken breast.", category: "Proteins" },
    { id: 3, name: "Beef Steak", price: 2500, description: "Grilled beef steak with mushroom sauce.", category: "Proteins" },
    { id: 4, name: "Veggie Salad", price: 1200, description: "Fresh greens with cherry tomatoes.", category: "Salads" },
    { id: 5, name: "Mashed Potatoes", price: 700, description: "Creamy buttery mashed potatoes.", category: "Sides" },
    { id: 6, name: "Ice Cream Sundae", price: 600, description: "Ice cream with chocolate sauce and nuts.", category: "Desserts" },
    { id: 7, name: "Orange Juice", price: 400, description: "Freshly squeezed juice.", category: "Drinks" },
    { id: 8, name: "Weekend Combo", price: 3000, description: "Protein, rice, side, 2 drinks.", category: "Specials" },
  ],
  3: [
    { id: 1, name: "Chicken Nuggets", price: 900, description: "Golden fried chicken nuggets.", category: "Proteins" },
    { id: 2, name: "Fries", price: 500, description: "Crispy potato fries.", category: "Sides" },
    { id: 3, name: "Grilled Chicken Sandwich", price: 1200, description: "Grilled chicken on soft bun.", category: "Main Menu" },
    { id: 4, name: "Jollof Rice", price: 1200, description: "Spicy tomato rice.", category: "Rice" },
    { id: 5, name: "Vanilla Ice Cream", price: 500, description: "Creamy dessert.", category: "Desserts" },
    { id: 6, name: "BBQ Sauce", price: 200, description: "Smoky BBQ sauce.", category: "Sauces" },
    { id: 7, name: "Lunch Combo", price: 2000, description: "Protein, rice, side, drink.", category: "Specials" },
  ],
  4: [
    { id: 1, name: "Grilled Fish", price: 2000, description: "Freshly grilled fish with lemon and spices.", category: "Proteins" },
    { id: 2, name: "Plantain Chips", price: 600, description: "Thinly sliced plantains fried crispy.", category: "Sides" },
    { id: 3, name: "Jollof Rice", price: 1200, description: "Flavored rice with tomato.", category: "Rice" },
    { id: 4, name: "Fried Rice", price: 1200, description: "Rice stir-fried with vegetables.", category: "Rice" },
    { id: 5, name: "Grilled Prawns", price: 2500, description: "Succulent grilled prawns.", category: "Proteins" },
    { id: 6, name: "Fruit Salad", price: 600, description: "Seasonal fruit mix.", category: "Desserts" },
    { id: 7, name: "Coca Cola", price: 300, description: "Refreshing drink.", category: "Drinks" },
    { id: 8, name: "Family Feast", price: 5500, description: "4 proteins, 4 sides, 4 drinks.", category: "Specials" },
  ],
};

export function getRestaurantTimeDisplay(time) {
  const hour = new Date().getHours();
  return hour >= 0 && hour < 8 ? "Closed" : time;
}
