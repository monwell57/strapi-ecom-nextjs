import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

function stripCartItem(cartItem) {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
  };
}

async function handleGetCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    });
    res.status(200).json(cartItems.map(stripCartItem));
  } catch (err) {
    res.status(401).end();
  }
}

async function handlePostCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { productId, quantity } = req.body;
  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productId, quantity }),
    });
    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
}

async function handleRemoveCart(req, res) {
 
  const { jwt } = req.cookies;
  // console.log('[handleRemoveCart] itemId:', itemId);
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const {itemId} = req.body
  try {
    await fetchJson(`${CMS_URL}/cart-items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
}

async function handleUpdateCart(req, res) {
  const {jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { quantity } = req.body;
  try {
    await fetchJson(`${CMS_URL}/cart-items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
}

async function handleCart(req, res) {
  switch (req.method) {
    case 'GET': 
      return handleGetCart(req, res);
    case 'POST':
      return handlePostCart(req, res);
    case 'DELETE':
      return handleRemoveCart(req, res)
    case 'PUT':
      return handleUpdateCart(req, res)
    default:
      res.status(405).end();
  }
}

export default handleCart;