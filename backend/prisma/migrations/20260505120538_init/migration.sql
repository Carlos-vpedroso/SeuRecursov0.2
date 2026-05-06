-- CreateEnum
CREATE TYPE "TipoMulta" AS ENUM ('LEVE', 'MEDIA', 'GRAVE', 'GRAVISSIMA');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PIX', 'CREDIT_CARD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentGateway" AS ENUM ('SICOOB', 'INFINITEPAY');

-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('GOOGLE', 'LOCAL');

-- CreateTable
CREATE TABLE "Multa" (
    "id" TEXT NOT NULL,
    "artigo_multa" TEXT NOT NULL,
    "codigo_multa" TEXT NOT NULL,
    "valor_multa" DECIMAL(10,2) NOT NULL,
    "valor_recurso" DECIMAL(10,2) NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo_multa" "TipoMulta" NOT NULL DEFAULT 'LEVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Multa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "multaId" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "metodo" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "gateway" "PaymentGateway" NOT NULL,
    "gatewayId" TEXT,
    "qrCode" TEXT,
    "qrCodeImage" TEXT,
    "checkout_url" TEXT,
    "metadata" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recurso" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "multaId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "autoInfracao" TEXT NOT NULL,
    "sensitiveData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "telefone" TEXT,
    "provider" "Providers" NOT NULL DEFAULT 'LOCAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Multa_artigo_multa_key" ON "Multa"("artigo_multa");

-- CreateIndex
CREATE UNIQUE INDEX "Multa_codigo_multa_key" ON "Multa"("codigo_multa");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_gatewayId_key" ON "Pagamento"("gatewayId");

-- CreateIndex
CREATE UNIQUE INDEX "Recurso_paymentId_key" ON "Recurso"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_multaId_fkey" FOREIGN KEY ("multaId") REFERENCES "Multa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recurso" ADD CONSTRAINT "Recurso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recurso" ADD CONSTRAINT "Recurso_multaId_fkey" FOREIGN KEY ("multaId") REFERENCES "Multa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recurso" ADD CONSTRAINT "Recurso_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
