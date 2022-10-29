
const HOST = process.env.REACT_APP_LOCAL_HOST ? process.env.REACT_APP_LOCAL_HOST : ""

const LINK_API = {

    // Info
    GET_INFO: HOST + "/api/info",

    // User
    CHECK_BC_ADDRESS: HOST +  "/api/user/check-bc-address",
    CREATE_USER: HOST + "/api/user/create",

    // Home
    VERIFY: HOST + "/api/nft/verify",
    CREATE_NFT: HOST + "/api/nft/create",

    // NFT
    LIST_NFT_BY_ADDRESS: HOST + "/api/nft/list/by-address",
    GET_DETAIL_NFT: HOST + "/api/nft/detail",
    GET_LIST_MESSAGE: HOST + "/api/market-nft/list/get-message",
    CREATE_MARKET_NFT: HOST + "/api/market-nft/list/create",
    GET_PROVENANCE: HOST + "/api/nft/provenance",
    GET_VERIFY_INFO: HOST + "/api/nft/verify-info",

    // Market NFT
    GET_LIST_MARKET_NFT: HOST + "/api/market-nft/get-list",
    GET_DETAIL_MARKET_NFT: HOST + "/api/market-nft/detail",
    GET_SIGNATURE_BUY: HOST + "/api/market-nft/get-signature-buy",
    UPDATE_NFT_BUY: HOST + "/api/market-nft/update-nft-buy",
    GET_MESSAGE_PLACE_A_BID: HOST + "/api/market-nft/place-a-bid/get-message",
    PLACE_A_BID: HOST + "/api/bid/place-a-bid",
    GET_BID_HISTORY: HOST + "/api/bid/bid-history",
    GET_SIGNATURE_CLAIM: HOST + "/api/bid/get-signature-claim",
    GET_REVOKE_INFO : HOST + "/api/market-nft/revoke-info",
    UPDATE_AFTER_REVOKE: HOST + "/api/market-nft/update-nft-after-revoke"
}

export default LINK_API