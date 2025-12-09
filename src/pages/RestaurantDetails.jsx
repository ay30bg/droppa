// src/pages/RestaurantDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiStar, FiClock, FiHeart, FiSearch } from "react-icons/fi";
import {
  featuredRestaurants,
  restaurantMenus,
  getRestaurantTimeDisplay,
} from "../data/restaurants.js";
import "../styles/restaurantdetails.css";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurantId = Number(id);

  // ---------- Hooks (must be before any early return) ----------
  const [loading, setLoading] = useState(true);
  const [favourite, setFavourite] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState([]); // items: { itemId, name, price, qty, extras: [...] }
  const [selectedItem, setSelectedItem] = useState(null); // for modal
  const [isClosed, setIsClosed] = useState(false);

  // ---------- Derived data from your data file ----------
  const restaurant = useMemo(
    () => featuredRestaurants.find((r) => r.id === restaurantId),
    [restaurantId]
  );

  const menus = restaurantMenus[restaurantId] || []; // array of sections {category, items:[]}

  // Flattened items for quick lookup
  const allItems = useMemo(
    () =>
      menus.flatMap((section) =>
        (section.items || []).map((it) => ({ ...it, category: section.category }))
      ),
    [menus]
  );

  // categories list
  const categories = useMemo(
    () => (menus.length ? menus.map((s) => s.category) : ["Menu"]),
    [menus]
  );

  // Initialize active category when data loads
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) setActiveCategory(categories[0]);
  }, [categories, activeCategory]);

  // Simulate loading (replace with real API fetch if needed)
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      // Open/closed logic based on your getRestaurantTimeDisplay or business hours (simple example)
      const timeText = getRestaurantTimeDisplay(restaurant?.deliveryTime || restaurant?.time);
      setIsClosed(timeText === "Closed");
    }, 600); // short shimmer
    return () => clearTimeout(t);
  }, [restaurant]);

  // Favourite persisted to localStorage
  useEffect(() => {
    const key = `fav_rest_${restaurantId}`;
    const saved = localStorage.getItem(key);
    if (saved === "1") setFavourite(true);
  }, [restaurantId]);

  useEffect(() => {
    const key = `fav_rest_${restaurantId}`;
    localStorage.setItem(key, favourite ? "1" : "0");
  }, [favourite, restaurantId]);

  if (!restaurant) {
    // Hooks already declared — safe to early return
    return (
      <div className="rd-empty">
        <button className="rd-back" onClick={() => navigate(-1)}>
          <FiChevronLeft />
        </button>
        <p>Restaurant not found</p>
      </div>
    );
  }

  // ---------- Helpers ----------
  const totalItems = cart.reduce((s, it) => s + it.qty, 0);
  const cartTotal = cart.reduce((s, it) => s + it.qty * (it.price + (it.extrasTotal || 0)), 0);

  const toggleFavourite = () => setFavourite((v) => !v);

  // Add item to cart (with extras and qty from modal or default qty 1)
  const addToCart = (payload) => {
    // payload: { id, name, price, qty, extras: [{id, name, price}], extrasTotal }
    setCart((prev) => {
      const idx = prev.findIndex(
        (p) =>
          p.itemId === payload.itemId &&
          JSON.stringify(p.extras || []) === JSON.stringify(payload.extras || [])
      );
      if (idx >= 0) {
        // merge qty
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (payload.qty || 1) };
        return copy;
      }
      return [...prev, { ...payload, qty: payload.qty || 1 }];
    });
  };

  const updateCartQty = (itemIndex, qty) => {
    setCart((prev) => {
      const copy = [...prev];
      if (qty <= 0) {
        copy.splice(itemIndex, 1);
      } else {
        copy[itemIndex] = { ...copy[itemIndex], qty };
      }
      return copy;
    });
  };

  const removeCartIndex = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  // Quantity quick control for menu list (not modal). We'll keep simple: add 1 each click.
  const addQuick = (item) => {
    if (isClosed) return;
    addToCart({
      itemId: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      extras: [],
      extrasTotal: 0,
    });
  };

  // Open item modal
  const openModalFor = (item) => {
    // prepare default extras if not present
    const withExtras = {
      ...item,
      selectedExtras: (item.extras || []).map((e) => ({ ...e, selected: false })),
      modalQty: 1,
    };
    setSelectedItem(withExtras);
  };

  // Modal helpers
  const modalToggleExtra = (extraIndex) => {
    setSelectedItem((prev) => {
      const copy = { ...prev };
      copy.selectedExtras = copy.selectedExtras.map((e, i) =>
        i === extraIndex ? { ...e, selected: !e.selected } : e
      );
      return copy;
    });
  };

  const modalChangeQty = (delta) => {
    setSelectedItem((prev) => {
      const q = Math.max(1, prev.modalQty + delta);
      return { ...prev, modalQty: q };
    });
  };

  const modalAddToCart = () => {
    if (!selectedItem) return;
    if (isClosed) return;

    const chosenExtras = (selectedItem.selectedExtras || []).filter((e) => e.selected);
    const extrasTotal = chosenExtras.reduce((s, ex) => s + (ex.price || 0), 0);

    addToCart({
      itemId: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      qty: selectedItem.modalQty,
      extras: chosenExtras,
      extrasTotal,
    });

    setSelectedItem(null);
  };

  // Filtered list based on activeCategory and search
  const visibleItems = useMemo(() => {
    let items = allItems;
    if (activeCategory) items = items.filter((it) => it.category === activeCategory);
    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      items = items.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          (it.description && it.description.toLowerCase().includes(q))
      );
    }
    return items;
  }, [allItems, activeCategory, searchText]);

  // ---------- Render ----------
  return (
    <div className="rd-page">
      {/* Header */}
      <header className="rd-header">
        <div className="rd-header-left">
          <button className="rd-back-btn" onClick={() => navigate(-1)}>
            <FiChevronLeft size={20} />
          </button>
          <div className="rd-title">
            <h2>{restaurant.name}</h2>
            <div className="rd-sub">
              <span className="rd-rating"><FiStar /> {restaurant.rating}</span>
              <span>•</span>
              <span>{getRestaurantTimeDisplay(restaurant.deliveryTime || restaurant.time)}</span>
              <span>•</span>
              <span>{restaurant.category || restaurant.street}</span>
            </div>
          </div>
        </div>

        <div className="rd-header-right">
          <button
            className={`rd-fav ${favourite ? "active" : ""}`}
            onClick={toggleFavourite}
            aria-label="Toggle favourite"
          >
            <FiHeart />
          </button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="rd-cats-wrap">
        <div className="rd-cats-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rd-cat ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="rd-search">
          <FiSearch className="rd-search-icon" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search menu..."
          />
        </div>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="rd-skeleton-list">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-left" />
              <div className="skeleton-right" />
            </div>
          ))}
        </div>
      ) : (
        <main className="rd-menu-list">
          {visibleItems.length === 0 ? (
            <div className="rd-empty-state">No items match your search.</div>
          ) : (
            visibleItems.map((item) => {
              // quantity in cart for this particular item+extras combination (simple: sum by itemId)
              const qtyInCart = cart.reduce((s, c) => (c.itemId === item.id ? s + c.qty : s), 0);

              return (
                <div key={item.id} className="rd-item-card">
                  <div className="rd-item-left" onClick={() => openModalFor(item)}>
                    <div className="rd-item-title">
                      <span className="rd-item-name">{item.name}</span>
                      <span className="rd-item-price">₦{item.price.toLocaleString()}</span>
                    </div>
                    {item.description && <div className="rd-item-desc">{item.description}</div>}
                    <div className="rd-item-meta">
                      {item.tags && item.tags.map((t) => <span key={t} className="rd-tag">{t}</span>)}
                    </div>
                  </div>

                  <div className="rd-item-actions">
                    {/* If closed disable */}
                    {isClosed ? (
                      <div className="rd-closed-pill">Closed</div>
                    ) : (
                      <>
                        <div className="rd-qty-display">{qtyInCart > 0 ? `${qtyInCart}` : ""}</div>
                        <button
                          className="rd-add-btn"
                          onClick={() => addQuick(item)}
                          aria-label={`Add ${item.name}`}
                        >
                          Add
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </main>
      )}

      {/* Modal bottom sheet */}
      {selectedItem && (
        <div className="rd-modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="rd-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="rd-modal-header">
              <h3>{selectedItem.name}</h3>
              <div className="rd-modal-price">₦{selectedItem.price.toLocaleString()}</div>
            </div>

            {selectedItem.description && <p className="rd-modal-desc">{selectedItem.description}</p>}

            {/* Extras */}
            {(selectedItem.selectedExtras || []).length > 0 && (
              <div className="rd-modal-extras">
                <h4>Add-ons</h4>
                {selectedItem.selectedExtras.map((ex, i) => (
                  <label key={i} className="rd-extra-row">
                    <input
                      type="checkbox"
                      checked={ex.selected}
                      onChange={() => modalToggleExtra(i)}
                    />
                    <span className="rd-extra-name">{ex.name}</span>
                    <span className="rd-extra-price">+₦{(ex.price || 0).toLocaleString()}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Qty selector */}
            <div className="rd-modal-qty">
              <button onClick={() => modalChangeQty(-1)}>-</button>
              <div>{selectedItem.modalQty}</div>
              <button onClick={() => modalChangeQty(1)}>+</button>
            </div>

            <div className="rd-modal-actions">
              <button className="rd-modal-cancel" onClick={() => setSelectedItem(null)}>
                Cancel
              </button>
              <button
                className="rd-modal-add"
                onClick={modalAddToCart}
                disabled={isClosed}
                title={isClosed ? "Restaurant closed" : "Add to cart"}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Cart Bar */}
      {cart.length > 0 && (
        <div className="rd-cart-bar">
          <div className="rd-cart-summary">
            <div className="rd-cart-count">{totalItems} items</div>
            <div className="rd-cart-total">₦{cartTotal.toLocaleString()}</div>
          </div>

          <div className="rd-cart-actions">
            <button
              className="rd-view-cart"
              onClick={() => {
                // Simple view cart: scroll to top of cart or open a full cart page
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }}
            >
              View Cart
            </button>

            <button
              className="rd-checkout"
              onClick={() => alert("Checkout — integrate your payments flow")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
