import config from "@/config"
import { Home, Login, Posts, PostDetail, NewPost } from "@/pages"
import DefaultLayout from "@/Layouts/DefaultLayout"

const routes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: DefaultLayout,
    },
    {
        path: config.routes.posts,
        component: Posts,
        layout: DefaultLayout,
    },
    {
        path: config.routes.postDetail,
        component: PostDetail,
        layout: DefaultLayout,
    },
    {
        path: config.routes.newPost,
        component: NewPost,
        layout: DefaultLayout,
    },
    {
        path: config.routes.notFound,
    },
]

export default routes
