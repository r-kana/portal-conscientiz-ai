export function createToast(text)
{
  const updateToast = $('#updateToast')
  if(updateToast.length) {
    updateToast.find(".toast-body").html(text);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(updateToast[0]);
    toastBootstrap.show();
  }
  else {
    console.log("No toast found")
  }
}