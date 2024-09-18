import { responseBNIDirect } from '../../util/response.js';
import HttpClient from '../../net/httpClient.js';
import { generateSignature, generateBniDirectKey } from '../../util/util.js';
export async function inhouseTransfer(params = { body, config }) {
  const body = {
    corporateId: params.body.corporateId,
    userId: params.body.userId,
    debitedAccountNo: params.body.debitedAccountNo,
    amountCurrency: params.body.amountCurrency,
    amount: params.body.amount,
    treasuryReferenceNo: params.body.treasuryReferenceNo,
    transactionPurposeCode: params.body.transactionPurposeCode,
    remark1: params.body.remark1,
    remark2: params.body.remark2,
    remark3: params.body.remark3,
    remitterReferenceNo: params.body.remitterReferenceNo,
    finalizePaymentFlag: params.body.finalizePaymentFlag,
    beneficiaryReferenceNo: params.body.beneficiaryReferenceNo,
    toAccountNo: params.body.toAccountNo,
    notificationFlag: params.body.notificationFlag,
    beneficiaryEmail: params.body.beneficiaryEmail,
    transactionInstructionDate: params.body.transactionInstructionDate,
    docUniqueId: params.body.docUniqueId
  };
  const signature = generateSignature({
    body: { ...body, timestamp: params.config.timeStamp },
    apiSecret: params.config.config.apiSecret
  });
  const bniDirectKey = generateBniDirectKey({
    corpId: body.corporateId.toLowerCase(),
    userId: body.userId.toLowerCase(),
    bniDirectKey: params.config.config.bniDirectKey
  });
  const httpClient = new HttpClient();
  const res = await httpClient.requestBniDirectV2({
    method: 'POST',
    apiKey: params.config.config.apiKey,
    accessToken: await params.config.client.getToken(),
    url: `${params.config.client.getBaseUrl()}/bnidirect/api/InHouse/Transfer`,
    signature: signature.split('.')[2],
    timestamp: params.config.timeStamp,
    data: body,
    bniDirectKey: bniDirectKey
  });
  return responseBNIDirect({ res: res });
}