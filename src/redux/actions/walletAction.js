import {
    FETCH_WALLET_BEGIN,
    FETCH_WALLET_SUCCESS,
    FETCH_WALLET_FAILURE,
} from '../CONSTANTS'
import axios from 'axios'
import { config } from '../../api/config';
const baseUrl = config.platformURL

export const getWallet =() => async dispatch =>{
    let auth_token =null;
    let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));

    if (isuserloggedin) {
      auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
        .currentSession.access_token;
    }
     else auth_token = null;

    const walletUrl =baseUrl+ "/wallet";
    const config ={
        method: 'get',
        url : walletUrl,
        headers: {
            Authorization: `Bearer ${auth_token}`,
          },
    }
    try{
        dispatch(fetchWalletBegin());
        const response = await axios(config)
        dispatch (fetchWalletSuccess(response.data.payload))
    }
    catch(e){
        dispatch(fetchWalletError(e))
    }
}

export const fetchWalletBegin = () =>({
    type : FETCH_WALLET_BEGIN,
})

export const fetchWalletSuccess = ( data) =>({
    type : FETCH_WALLET_SUCCESS,
    payload : data,
})

export const fetchWalletError = (error) => ({
    type : FETCH_WALLET_FAILURE,
    payload: {error}
})