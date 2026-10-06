import type { Content } from "pdfmake/interfaces";
import type { PdfContext } from "../types";

import { headerPadrao } from "./header/index";
import { introducaoCetran, introducaoPadrao } from "./introducao/index";
import { defesaCetran, defesaJari, defesaPrevia } from "./tipoDefesa";
import { tempestividadePadrao } from "./tempestividade";
import { nulidadeCetran, nulidadeJari } from "./nulidade";
import { dosFatosComComentario, dosFatosPadrao } from "./dosFatos";
import { acessoAutoPadrao } from "./acessoAuto";
import { atosAdministrativoPadrao } from "./atosAdministrativos";
import { medidaAdministrativaPadrao } from "./medidaAdministrativa";
import { inepciaPenalidadePadrao } from "./inepciaPenalidade";
import { inconsistenciaPenalidadePadrao } from "./inconsistenciaPenalidade";
import { dosPedidosPadrao } from "./dosPedidos";
import { equipamentoMedidorPadrao } from "./equipamentoMedidor";
import { doDireitoPadrao } from "./doDireito";
import { tempoNotificacaoPadrao } from "./tempoNotificacao";

export function recursoTemplate(context: PdfContext): Content[] {
  switch (context.selectedMulta.tipo_recurso) {
    case "ADMINISTRATIVO":
      return [
        //INTRODUÇÃO
        ...(context.dadosFormulario.tipoDefesa === "Cetran"
          ? introducaoCetran()
          : introducaoPadrao()),
        //APRESENTAÇÃO DO CLIENTE
        ...headerPadrao(context),
        //TIPO DA DEFESA QUE ESTÁ RECORRENDO - DEFESA PRÉVIA / JARI/ CETRAN
        ...(context.dadosFormulario.tipoDefesa === "Defesa Prévia"
          ? defesaPrevia()
          : context.dadosFormulario.tipoDefesa === "Jari"
            ? defesaJari()
            : defesaCetran()),
        //DA TEMPESTIVIDADE
        ...tempestividadePadrao(),
        // DA NULIDADE DA DECISÃO
        // APENAS SE FOR TIPO DEFESA JARI / CETRAN
        ...(context.dadosFormulario.tipoDefesa === "Jari"
          ? nulidadeJari()
          : context.dadosFormulario.tipoDefesa === "Cetran"
            ? nulidadeCetran()
            : []),
        // DOS FATOS
        ...(context.dadosFormulario.fatoComentario !== ""
          ? dosFatosComComentario(context)
          : dosFatosPadrao()),
        // PRELIMINARMENTE - NOTIFICAÇÃO EMITIDA A MAIS DE 30 DIAS
        ...(context.dadosFormulario.tempoNotificacao === "SIM"
          ? tempoNotificacaoPadrao()
          : []),
        //ACESSO AO AUTO DE INFRAÇÃO
        ...(context.dadosFormulario.acessoAuto === "NÃO"
          ? acessoAutoPadrao()
          : []),

        //MOTIVAÇÃO DOS ATOS ADMINISTRATIVOS
        ...atosAdministrativoPadrao(),
        //NÃO CUMPRIMENTO DE MEDIDA ADMINISTRATIVA
        ...medidaAdministrativaPadrao(),
        //INEPCIA DA PENALIDADE
        ...inepciaPenalidadePadrao(),
        //IRREGULARIDADE E INCONSISTÊNCIA DA PENALIDADE
        ...inconsistenciaPenalidadePadrao(),
        ...dosPedidosPadrao(context),
      ];
    case "ADMINISTRATIVO_EQUIPAMENTO":
      return [
        //INTRODUÇÃO
        ...(context.dadosFormulario.tipoDefesa === "Cetran"
          ? introducaoCetran()
          : introducaoPadrao()),
        //APRESENTAÇÃO DO CLIENTE
        ...headerPadrao(context),
        //TIPO DA DEFESA QUE ESTÁ RECORRENDO - DEFESA PRÉVIA / JARI/ CETRAN
        ...(context.dadosFormulario.tipoDefesa === "Defesa Prévia"
          ? defesaPrevia()
          : context.dadosFormulario.tipoDefesa === "Jari"
            ? defesaJari()
            : defesaCetran()),
        //DA TEMPESTIVIDADE
        ...tempestividadePadrao(),
        // DA NULIDADE DA DECISÃO
        // APENAS SE FOR TIPO DEFESA JARI / CETRAN
        ...(context.dadosFormulario.tipoDefesa === "Jari"
          ? nulidadeJari()
          : context.dadosFormulario.tipoDefesa === "Cetran"
            ? nulidadeCetran()
            : []),
        // DOS FATOS
        ...(context.dadosFormulario.fatoComentario
          ? dosFatosComComentario(context)
          : dosFatosPadrao()),
        // PRELIMINARMENTE - NOTIFICAÇÃO EMITIDA A MAIS DE 30 DIAS
        ...(context.dadosFormulario.tempoNotificacao === "SIM"
          ? tempoNotificacaoPadrao()
          : []),
        //ACESSO AO AUTO DE INFRAÇÃO
        ...(context.dadosFormulario.acessoAuto === "NÃO"
          ? acessoAutoPadrao()
          : []),
        //MOTIVAÇÃO DOS ATOS ADMINISTRATIVOS
        ...atosAdministrativoPadrao(),
        //NÃO CUMPRIMENTO DE MEDIDA ADMINISTRATIVA
        ...medidaAdministrativaPadrao(),
        // EQUIPAMENTO MEDIDOR
        ...equipamentoMedidorPadrao(),
        //INEPCIA DA PENALIDADE
        ...inepciaPenalidadePadrao(),
        //IRREGULARIDADE E INCONSISTÊNCIA DA PENALIDADE
        ...inconsistenciaPenalidadePadrao(),
        ...dosPedidosPadrao(context),
      ];
    case "VELOCIDADE":
      return [
        //INTRODUÇÃO
        ...(context.dadosFormulario.tipoDefesa === "Cetran"
          ? introducaoCetran()
          : introducaoPadrao()),
        //APRESENTAÇÃO DO CLIENTE
        ...headerPadrao(context),
        //TIPO DA DEFESA QUE ESTÁ RECORRENDO - DEFESA PRÉVIA / JARI/ CETRAN
        ...(context.dadosFormulario.tipoDefesa === "Defesa Prévia"
          ? defesaPrevia()
          : context.dadosFormulario.tipoDefesa === "Jari"
            ? defesaJari()
            : defesaCetran()),
        //DA TEMPESTIVIDADE
        ...tempestividadePadrao(),
        // DA NULIDADE DA DECISÃO
        // APENAS SE FOR TIPO DEFESA JARI / CETRAN
        ...(context.dadosFormulario.tipoDefesa === "Jari"
          ? nulidadeJari()
          : context.dadosFormulario.tipoDefesa === "Cetran"
            ? nulidadeCetran()
            : []),
        // DOS FATOS
        ...(context.dadosFormulario.fatoComentario
          ? dosFatosComComentario(context)
          : dosFatosPadrao()),
        // PRELIMINARMENTE - NOTIFICAÇÃO EMITIDA A MAIS DE 30 DIAS
        ...(context.dadosFormulario.tempoNotificacao === "SIM"
          ? tempoNotificacaoPadrao()
          : []),
        //ACESSO AO AUTO DE INFRAÇÃO
        ...(context.dadosFormulario.acessoAuto === "NÃO"
          ? acessoAutoPadrao()
          : []),
        //DO DIREITO - MULTA VELOCIDADE
        ...doDireitoPadrao(),
        ...dosPedidosPadrao(context),
      ];
  }
}
