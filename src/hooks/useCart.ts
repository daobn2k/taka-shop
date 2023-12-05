import { useMemo } from 'react';

import { useAtom } from 'jotai';

import { IProductData, TProductSize } from '@/api/interface';
import { ICart, IOrderProduct, atomCart } from '@/store/cart/cart';
import { atomCartPending } from '@/store/cartPending/cartPending';
import { useProfile } from '@/store/profile/useProfile';
import { localStorageUtils } from '@/utils/local-storage-utils';

export const useCart = () => {
  const [cart, setCart] = useAtom(atomCart);
  const [cartPending, setCartPending] = useAtom(atomCartPending);

  const profile = useProfile();

  const onAddCart = (product: IProductData, quantity?: number, size?: TProductSize) => {
    const newCart = cart ? [...cart] : []; // Tạo một bản sao của giỏ hàng để tránh ảnh hưởng trực tiếp
    const existingProduct = newCart?.find(
      (item: ICart) => item.id === product.id && item?.size === size && profile?.id === item.userid,
    );

    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
      existingProduct.quantity += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng
      newCart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: Number(product.price), // Chuyển đổi giá thành số
        price_discount: product.price_discount ? Number(product.price_discount) : 0,
        quantity: quantity ?? 1,
        size: size ?? 'S',
        userid: profile?.id,
      });
    }
    setData(newCart);
  };

  const onDeleteCart = (id: number) => {
    const newCart = cart.filter((c) => c.id !== id);

    setData(newCart);
  };

  const onModifyCart = (id: number, quantity: any, size: TProductSize) => {
    const newCart = [...cart]; // Tạo một bản sao của giỏ hàng để tránh ảnh hưởng trực tiếp
    const existingProduct = newCart?.find((item: ICart) => item.id === id && item.size === size);
    if (existingProduct) {
      existingProduct.quantity = Number(quantity);
    }
    setData(newCart);
  };

  const onModifyCartPending = (quantity: number) => {
    const newCartPending = Number(cartPending) + quantity;
    localStorageUtils.set('cart-pending', newCartPending);
    setCartPending(newCartPending);
  };

  const setData = (data: ICart[]) => {
    setCart(data);
    localStorageUtils.set('cart', data);
  };

  const cartByUser = useMemo(() => {
    return profile && cart?.length > 0 ? cart.filter((c) => c.userid === profile?.id) : [];
  }, [cart, profile]);

  const formatToOrder = () => {
    return cartByUser.map((c: ICart) => {
      return {
        product: c.id,
        quantity: c.quantity,
        price: c.price_discount ? (c.price - c.price_discount) * c.quantity : c.price * c.quantity,
        size: c.size,
      };
    }) as IOrderProduct[];
  };

  const { totalQuantity, totalPrice } = useMemo(() => {
    const totalQuantity = cartByUser.reduce((acc: any, cart: ICart) => acc + cart.quantity, 0);
    const totalPrice = cartByUser.reduce(
      (acc, cart: ICart) => acc + (cart.price - cart.price_discount) * cart.quantity,
      0,
    );

    return { totalQuantity, totalPrice };
  }, [cartByUser]);
  return {
    total_cart: cartByUser.length,
    cart: cartByUser,
    onAddCart,
    onDeleteCart,
    onModifyCart,
    totalQuantity,
    totalPrice,
    formatToOrder,
    onModifyCartPending,
  };
};
