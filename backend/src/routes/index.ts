import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

// Caminho até a pasta modules
const modulesPath = path.join(__dirname, "../modules");

// Lê todos os diretórios dentro de modules
fs.readdirSync(modulesPath).forEach((moduleName) => {
  const modulePath = path.join(modulesPath, moduleName);

  // Garante que é uma pasta e que existe um arquivo *.routes.ts
  if (fs.statSync(modulePath).isDirectory()) {
    const routeFile = path.join(modulePath, `${moduleName}.routes.ts`);
    const routeFileJs = path.join(modulePath, `${moduleName}.routes.js`);

    if (fs.existsSync(routeFile) || fs.existsSync(routeFileJs)) {
      const { default: moduleRouter } = require(fs.existsSync(routeFile)
        ? routeFile
        : routeFileJs);

      if (moduleRouter?.path && moduleRouter?.router) {
        console.log(`✅ Rota carregada: ${moduleRouter.path}`);
        router.use(moduleRouter.path, moduleRouter.router);
      }
    }
  }
});

export default router;