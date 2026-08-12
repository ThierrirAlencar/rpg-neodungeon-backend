export interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(filters:unknown, page:number,size:number): Promise<T[]>;
  create(data: unknown): Promise<T>;
  update(id: string, data: unknown): Promise<T>;
  delete(id: string): Promise<void>;
}