export class Customer{
  public customer_id: number | null;
  public customer_email: string | null;
  public customer_name: string | null;
  public gender: number | null;
  public birthday: Date | null;
  public customer_phone: string | null;
  public customer_address: string | null;
  public image: string | null;
  public note: string | null;
  public token_type: string;
  public access_token: string;
}
