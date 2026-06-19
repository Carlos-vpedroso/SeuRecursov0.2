import { multasSeed } from "./multasSeed";

async function main() {
    await multasSeed();

    console.log("✅ Seed multas executado com sucesso");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});