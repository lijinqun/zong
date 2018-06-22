const order = {
    state: {
        that: {},
        person: [],
        print: [],
        catList: []
    },
    mutations: {
        setThat (state, list) {
            state.that = list;
        },
        setPerson (state, list) {
            state.person = [];
            state.person.push(...list);
        },
        setPrint (state, list) {
            state.print = [];
            state.print.push(...list);
        },
        setCatList (state, list) {
            state.catList = [];
            state.catList.push(...list);
        }
    },
    actions: {
        setThatAction (context, data) {
            context.commit('setThat', data);
        },
        setPersonAction (context, data) {
            context.commit('setPerson', data);
        },
        setPrintAction (context, data) {
            context.commit('setPrint', data);
        },
        setCatListAction (context, data) {
            context.commit('setCatList', data);
        }
    }
};

export default order;
