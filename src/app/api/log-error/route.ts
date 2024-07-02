export async function POST(request: Request) {
  const { error, errorInfo } = await request.json();

  // FIXME: Change to use error log api
  console.log('Logged Error:', error);
  console.log('Error Info:', errorInfo);

  return Response.json({ message: 'Error logged successfully' });
}
