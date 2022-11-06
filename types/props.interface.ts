/**
 * @description children이 필요한 Props interface는 이 Interface를 상속받을 것
 */
export default interface IProps {
  children: JSX.Element | Array<JSX.Element> | string;
}
