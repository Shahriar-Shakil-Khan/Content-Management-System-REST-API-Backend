import express from "express"
import { toNodeHandler } from "better-auth/node";
import { postRouter } from "./modules/post/post.routes";
import { auth } from "./lib/auth";
const app = express();
import cors from 'cors';
//import { commentRouter } from "./modules/comment/comment.routes";

app.use(cors({
  origin: process.env.APP_URL,
  credentials: true,
}));


app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/posts", postRouter);
//app.use("/comments", commentRouter);



app.get("/", (req, res) => {
       res.send(" <<======== Hello Shakil, New Application Prisma Blog App ========>> ");
});
export default app;