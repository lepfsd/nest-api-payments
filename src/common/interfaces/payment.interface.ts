export interface IPayment extends Document {
  name: string;
  url: string;
  token_secret: string;
  enabled: boolean;
}
