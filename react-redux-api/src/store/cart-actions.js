import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchDate = async () => {
            const response = await fetch('https://maxm-reduxapicall-default-rtdb.firebaseio.com/Cart.json')

            if (!response.ok) {
                throw new Error('Could not fetch cart data')
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchDate();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending....',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            const response = await fetch('https://maxm-reduxapicall-default-rtdb.firebaseio.com/Cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items, totalQuantity: cart.totalQuantity
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );

        } catch (error) {

            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }


    };
};