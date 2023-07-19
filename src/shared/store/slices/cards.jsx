import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    items: [],
    img: [],
    isLoading: false,
    error: '',
};

const backendUrl = 'https://backend.msb-container.ru'

export const getCards = createAsyncThunk("/getCards", async ({}, {rejectWithValue}) => {
    return fetch(`${backendUrl}/getCards`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);
export const deleteCard = createAsyncThunk("/deleteCard", async ({idCard}, {rejectWithValue}) => {   
    return fetch(`${backendUrl}/deleteCard`,{
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({idCard})
          },
    )
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);
export const changePhoto = createAsyncThunk("/changePhoto", async ({img}, {rejectWithValue}) => {   
  return fetch(`${backendUrl}/changePhoto`,{
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({img})
        },
  )
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
},
);

export const deleteImg = createAsyncThunk("/deleteImg", async ({idCard, img, index, form}, {rejectWithValue}) => {   
  return fetch(`${backendUrl}/deleteImg`,{
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({idCard, img, index, form: form})
        },
  )
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
},
);


export const getCardsImg = createAsyncThunk("/getCardsImg", async ({}, {rejectWithValue}) => {
    return fetch(`${backendUrl}/getCardsImg`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const getDeleteCards = createAsyncThunk("/getDeleteCards", async ({}, {rejectWithValue}) => {
  return fetch(`${backendUrl}/getDeleteCards`)
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
},
);

export const addCards = createAsyncThunk("/addCards", async ({}, {rejectWithValue}) => {
    return fetch(`${backendUrl}/addCards`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
});
export const addImg = createAsyncThunk("/addImg", async ({img, idCard, index, form}, {rejectWithValue}) => {
  console.log(idCard);
  const formData = new FormData();
  formData.append('img', img);
  formData.append('idCard', idCard)
  formData.append('index', index);
  formData.append('name', form.name)
  formData.append('role', form.role)
  formData.append('content', form.content)
  formData.append('size', form.size)
  formData.append('finishing', form.finishing)
  formData.append('states', form.states)
  formData.append('star', form.star)
  formData.append('text', form.text)
  formData.append('price', form.price)
  formData.append('discount', form.discount)
  formData.append('have', form.have)
  return fetch(`${backendUrl}/addImg`,{
      method: "POST",
      body: formData
  })
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
});

export const updateCard = createAsyncThunk("/updateCard", async ({form}, {rejectWithValue}) => {
  const formData = new FormData();
  formData.append('idCard', form.idCard)
  formData.append('name', form.name)
  formData.append('role', form.role)
  formData.append('content', form.content)
  formData.append('size', form.size)
  formData.append('finishing', form.finishing)
  formData.append('states', form.states)
  formData.append('star', form.star)
  formData.append('text', form.text)
  formData.append('price', form.price)
  formData.append('discount', form.discount)
  formData.append('have', form.have)
  return fetch(`${backendUrl}/updateCard`,{
      method: "POST",
      body: formData
  })
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
});

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: {
        [getCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getCards.fulfilled.type]: (state, action) => {
          state.isLoading = false;
          state.items = action.payload;
          localStorage.setItem("cards", JSON.stringify(state.items))
        },
        [getCardsImg.pending.type]: (state) => {
          state.isLoading = true;
        },
        [getCardsImg.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.img = action.payload;
            localStorage.setItem("cardsImg", JSON.stringify(state.img))
        },
        [addCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addCards.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                state.error = ''
                state.items = [...state.items, action.payload];
                localStorage.setItem("cards", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
         
        },
        [addImg.pending.type]: (state) => {
          state.isLoading = true;
        },
        [addImg.fulfilled.type]: (state, action) => {
            if (!action.payload.err) {
                state.isLoading = false;
                state.error = ''
                if (action.payload.cardsImgResult) {     
                  state.img = action.payload.cardsImgResult
                  localStorage.setItem("cardsImg", JSON.stringify(state.img))
                } else{
                  state.items = action.payload.cardsResult
                  localStorage.setItem("cards", JSON.stringify(state.items))
                }
            } else{
                state.error = action.payload.err 
            }
        
        },
        [changePhoto.pending.type]: (state) => {
          state.isLoading = true;
        },
        [changePhoto.fulfilled.type]: (state, action) => {
            if (!action.payload.err) {
              console.log(action.payload.cardsImgResult);
                state.isLoading = false;
                state.error = ''
                state.img = action.payload.cardsImgResult
                localStorage.setItem("cardsImg", JSON.stringify(state.img))
            } else{
                state.error = action.payload.err 
            }
        
        },
        [deleteImg.pending.type]: (state) => {
          state.isLoading = true;
        },
        [deleteImg.fulfilled.type]: (state, action) => {
            if (!action.payload.err) {
                state.isLoading = false;
                state.error = ''
                if (action.payload.cardsImgResult) {     
                  state.img = action.payload.cardsImgResult
                  localStorage.setItem("cardsImg", JSON.stringify(state.img))
                }                 
                if (action.payload.cardsResult) { 
                  state.items = action.payload.cardsResult
                  localStorage.setItem("cards", JSON.stringify(state.items))
                }
            } else{
                state.error = action.payload.err 
            }
        
        },
        [updateCard.fulfilled.type]: (state, action) => {
          if (!action.payload.err) {
              state.isLoading = false;
              state.error = ''
              state.items = action.payload;
              localStorage.setItem("cards", JSON.stringify(state.items))
          } else{
              state.error = action.payload.err
          }
       
      },
    }
});

