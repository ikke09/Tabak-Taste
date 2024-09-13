export class ApiError extends Error {
  private readonly route: string;
  constructor(route: string, msg: string) {
    super(msg);
    this.name = '[API-Error]';
    this.route = route;
  }

  override get message(): string {
    return `${this.name} - ${this.route} - ${this.message}`;
  }
}
