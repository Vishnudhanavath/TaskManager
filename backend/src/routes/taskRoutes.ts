  // src/routes/taskRoutes.ts
import { Request, Response, NextFunction } from "express";
  import { AppDataSource } from "../data-source"
  import { Task } from "../entity/Task"
  import { Router } from "express";
  const router = Router();



  router.get("/tasks", async (_, res) => {
    const taskRepo = AppDataSource.getRepository(Task)
    const tasks = await taskRepo.find()
    res.json(tasks)
  })

  router.post("/tasks", async (req, res) => {
    const taskRepo = AppDataSource.getRepository(Task)
    const task = taskRepo.create(req.body)
    const result = await taskRepo.save(task)
    res.status(201).json(result)
  })


  type ExpressHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

router.put("/tasks/:id", (async (req, res, next) => {
  const taskRepo = AppDataSource.getRepository(Task);

  const task = await taskRepo.findOneBy({ id: req.params.id });
  if (!task) return res.status(404).json({ message: "Task not found" });

  taskRepo.merge(task, req.body);
  const result = await taskRepo.save(task);
  res.json(result);
}) as ExpressHandler);

 
router.delete("/tasks/:id", (async (req, res, next) => {
  const taskRepo = AppDataSource.getRepository(Task);
  const task = await taskRepo.findOneBy({ id: req.params.id });
  
  if (!task) return res.status(404).json({ message: "Task not found" });

     const result = await taskRepo.delete(req.params.id)
  res.json(result)
}) as ExpressHandler);




  export default router
