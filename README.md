# [React Router](https://ithelp.ithome.com.tw/articles/10305940)

BrowserRouter ： 網址沒有 # 字號較美觀，有後端設定，換 url 時會發送 request

HashRouter ：網址會帶 # 字號，純前端使用，換 url 時不會發送 request

- 引入
    ```JavaScript
    import { BrowserRouter as Router } from 'react-router-dom'
    import { Routes, Route, Link, Outlet } from 'react-router-dom'
    ```

- Link 組件
    ```JavaScript
    // 相對路由
    <Link to="page1">PAGE1</Link>

    // 絕對路由
    <Link to="/page2">PAGE2</Link> 
    ```
- 嵌套路由 Nested Routes
    ```JavaScript
    /* 設定路由在「嵌套組件」的 Route 底下 */

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="page1" element={<Page1 />} />
        <Route path="page2" element={<Page2 />} />
        <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
    </BrowserRouter>
    ```
    ```JavaScript
    /* 嵌套組件加入 Outlet 顯示頁面內容 */

    import { Outlet } from "react-router-dom"
    import Header from "./Header"
    import Footer from "./Footer"

    export default Layout = () => {
        return (
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
        )
    }
    ```