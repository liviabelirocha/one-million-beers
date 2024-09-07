/* eslint-disable @typescript-eslint/no-explicit-any */
export class ValidationError extends Error {
  readonly data: any;

  constructor(message: string, data?: any) {
    super(message);
    this.data = data;
  }
}
