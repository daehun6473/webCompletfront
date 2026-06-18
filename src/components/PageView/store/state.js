const defaultState = {
    searchParams: {
        bookNm: '',
    },

    resultData: {
        mainData: []
    },

    resultDetail:{
        detailData: {}
    },

    modal: {
        isOpen: false
    },

    AddModal: {
        isOpen: false
    },

    preModal: {
        isOpen: false
    }

};

export default {
    ...JSON.parse(JSON.stringify(defaultState))
};

export {defaultState};