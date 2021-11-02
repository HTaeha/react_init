import {call, put} from 'typed-redux-saga'

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
export const createPromiseSaga = (type:string, promiseCreator:any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action:any) {
    try {
      // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
      const payload = yield* call(promiseCreator, action.payload);
      yield* put({ type: SUCCESS, payload });
    } catch (e) {
      yield* put({ type: ERROR, error: true, payload: e });
    }
  };
};

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
// 복수개의 디스패치를 처리함.
export const createPromiseSagas = (type:string, promiseCreator:any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action:any) {
    try {
      // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
      const payload = []
      for (let i = 0; i < action.payload.length; i++) {
        const temp = yield* call(promiseCreator, action.payload[i]);
        payload.push(temp)
      }
      yield* put({ type: SUCCESS, payload });
    } catch (e) {
      yield* put({ type: ERROR, error: true, payload: e });
    }
  };
};

// 특정 id의 데이터를 조회하는 용도로 사용하는 사가
// API를 호출 할 때 파라미터는 action.payload를 넣고,
// id 값을 action.meta로 설정합니다.
export const createPromiseSagaById = (type:string, promiseCreator:any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action:any) {
    const id = action.meta;
    try {
      const payload = yield* call(promiseCreator, action.payload);
      yield* put({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      yield* put({ type: ERROR, error: e, meta: id });
    }
  };
};

// 리듀서에서 사용 할 수 있는 여러 유틸 함수들입니다.
export const reducerUtils = {
  // 초기 상태. 초기 data 값은 기본적으로 null 이지만
  // 바꿀 수도 있습니다.
  initial: (initialData : any = null) => ({
    loading: false,
    data: initialData,
    error: null,
    reRender: false
  }),
  // 로딩중 상태. prevState의 경우엔 기본값은 null 이지만
  // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지시킬 수 있습니다.
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
    reRender: false
  }),
  // 성공 상태
  success: (payload: any) => ({
    loading: false,
    data: payload,
    error: null,
    reRender: false
  }),
  // 실패 상태
  error: (error:Error)=> ({
    loading: false,
    data: null,
    error: error,
    reRender: false
  })
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type:string, key:string, keepData = false) => {
  const [SUCCESS, ERROR, RERENDER] = [`${type}_SUCCESS`, `${type}_ERROR`, `${type}_RERENDER`];
  return (state:any, action:any) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null)
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        };
      case RERENDER:
        let newData = state[key]
        newData.reRender = !newData.reRender
        return {
          ...state,
          [key]: newData
        }
      default:
        return state;
    }
  };
};

// id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type:string, key:string, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state:any, action:any) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              // state[key][id]가 만들어져있지 않을 수도 있으니까 유효성을 먼저 검사 후 data 조회
              keepData ? state[key][id] && state[key][id].data : null
            )
          }
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload)
          }
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload)
          }
        };
      default:
        return state;
    }
  };
};