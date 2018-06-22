const good = {
    state: {
        goodsTable: [],
        cacheGoodsTable: [],
        edittingStore: []
    },
    mutations: {
        setGoodTable (state, list) {
            state.goodsTable = [];
            state.goodsTable.push(...list);
        },
        setCacheGoodTable (state, list) {
            state.cacheGoodsTable = [];
            state.cacheGoodsTable.push(...list);
        },
        setEdittingStore (state, list) {
            state.edittingStore = [];
            state.edittingStore.push(...list);
        }
    },
    actions: {
        setGoodTableAction (context, data) {
            context.commit('setGoodTable', data);
        },
        setCacheGoodTableAction (context, data) {
            context.commit('setCacheGoodTable', data);
        },
        setEdittingStoreAction (context, data) {
            context.commit('setEdittingStore', data);
        }
    }
};

export default good;
