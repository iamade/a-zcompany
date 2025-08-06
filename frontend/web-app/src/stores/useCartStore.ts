import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { cartApi } from "@/src/lib/api";
import type { Cart, CartItem, Product, DeliveryMethod } from "@/src/types";

interface CartState {
  cart: Cart | null;
  selectedDelivery: DeliveryMethod | null;
  loading: boolean;

  // Actions
  getCart: () => Promise<void>;
  setCart: (cart: Cart) => Promise<void>;
  addItemToCart: (item: Product, quantity?: number) => Promise<void>;
  removeItemFromCart: (productId: number) => Promise<void>;
  updateItemQuantity: (productId: number, quantity: number) => Promise<void>;
  deleteCart: () => Promise<void>;
  setSelectedDelivery: (delivery: DeliveryMethod | null) => void;
  createCart: () => Cart;
}

const createNewCart = (): Cart => ({
  id: nanoid(),
  items: [],
});

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      selectedDelivery: null,
      loading: false,

      getCart: async () => {
        const state = get();
        let cartId = state.cart?.id || localStorage.getItem("cart_id");

        if (!cartId) {
          const newCart = createNewCart();
          localStorage.setItem("cart_id", newCart.id);
          set({ cart: newCart });
          return;
        }

        set({ loading: true });
        try {
          const cart = await cartApi.getCart(cartId);
          set({ cart, loading: false });
        } catch (error) {
          console.error("Error fetching cart:", error);
          // If cart doesn't exist, create a new one
          const newCart = createNewCart();
          localStorage.setItem("cart_id", newCart.id);
          set({ cart: newCart, loading: false });
        }
      },

      setCart: async (cart: Cart) => {
        set({ loading: true });
        try {
          const updatedCart = await cartApi.setCart(cart);
          set({ cart: updatedCart, loading: false });
        } catch (error) {
          console.error("Error updating cart:", error);
          set({ loading: false });
        }
      },

      addItemToCart: async (item: Product, quantity = 1) => {
        const state = get();
        const cart = state.cart || createNewCart();

        const cartItem: CartItem = {
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: 0,
          pictureUrl: item.pictureUrl,
          brand: item.brand,
          type: item.type,
        };

        const existingItemIndex = cart.items.findIndex(
          (i) => i.productId === cartItem.productId
        );

        if (existingItemIndex === -1) {
          cartItem.quantity = quantity;
          cart.items.push(cartItem);
        } else {
          cart.items[existingItemIndex].quantity += quantity;
        }

        await state.setCart(cart);
      },

      removeItemFromCart: async (productId: number) => {
        const state = get();
        const cart = state.cart;
        if (!cart) return;

        const itemIndex = cart.items.findIndex(
          (i) => i.productId === productId
        );
        if (itemIndex !== -1) {
          cart.items.splice(itemIndex, 1);

          if (cart.items.length === 0) {
            await state.deleteCart();
          } else {
            await state.setCart(cart);
          }
        }
      },

      updateItemQuantity: async (productId: number, quantity: number) => {
        const state = get();
        const cart = state.cart;
        if (!cart) return;

        const itemIndex = cart.items.findIndex(
          (i) => i.productId === productId
        );
        if (itemIndex !== -1) {
          if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
          } else {
            cart.items[itemIndex].quantity = quantity;
          }

          if (cart.items.length === 0) {
            await state.deleteCart();
          } else {
            await state.setCart(cart);
          }
        }
      },

      deleteCart: async () => {
        const cart = get().cart;
        if (!cart) return;

        try {
          await cartApi.deleteCart(cart.id);
          localStorage.removeItem("cart_id");
          set({ cart: null });
        } catch (error) {
          console.error("Error deleting cart:", error);
        }
      },

      setSelectedDelivery: (delivery: DeliveryMethod | null) => {
        set({ selectedDelivery: delivery });
      },

      createCart: createNewCart,
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

// Selectors for computed values
export const useCartItemCount = () =>
  useCartStore(
    (state) =>
      state.cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0
  );

export const useCartTotal = () =>
  useCartStore((state) => {
    if (!state.cart) return 0;
    return state.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  });
