# Services Folder

This folder is for API and business logic services.

## Structure
- Add your service files here
- Use .ts for TypeScript services
- Export services from index.ts if needed

## Example
// ExampleService.ts
export interface ExampleData {
  id: string;
  name: string;
}

export class ExampleService {
  async getData(): Promise<ExampleData[]> {
    // Your API call logic here
    return [];
  }
}

export const exampleService = new ExampleService();
