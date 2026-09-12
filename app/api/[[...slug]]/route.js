import { dispatchApiRoute } from '@/lib/api-router';

export const dynamic = 'force-dynamic';

export async function GET(request, context) {
  return dispatchApiRoute('GET', request, context?.params);
}

export async function POST(request, context) {
  return dispatchApiRoute('POST', request, context?.params);
}

export async function PUT(request, context) {
  return dispatchApiRoute('PUT', request, context?.params);
}

export async function PATCH(request, context) {
  return dispatchApiRoute('PATCH', request, context?.params);
}

export async function DELETE(request, context) {
  return dispatchApiRoute('DELETE', request, context?.params);
}

export async function OPTIONS(request, context) {
  return dispatchApiRoute('OPTIONS', request, context?.params);
}
