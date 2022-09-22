/**
 * 区块链地址脱敏
 * @param chinaAddr 区块链地址，13位长度
 */
export function chinaAddrMasking(chinaAddr: string) {
  if (!chinaAddr) return ''
  return chinaAddr.replace(/(\S{5})\S{3}(\S{5})/g, '$1 *** $2')
}
