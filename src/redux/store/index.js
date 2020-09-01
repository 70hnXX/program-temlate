import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [
  thunkMiddleware
]

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  //获取当前值
  let currentValue = store.getState();

  //开发环境创建一个监听
  if (process.env.NODE_ENV === 'development') {
    store.subscribe(() => {
      const previosValue = currentValue;
      currentValue = store.getState();
      console.log('上一个值:', previosValue, '当前值:', currentValue)
    });
  }
  return store
}