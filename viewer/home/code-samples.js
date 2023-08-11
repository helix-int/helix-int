const csharp = {
  "name": "C#",
  "highlight": "hljs language-csharp"
}
csharp["sample"] = `var client = new HttpClient();
var content = new MultipartFormDataContent();
content.Add(new StringContent("your//full//path//file"), "path");
var request = new HttpRequestMessage(HttpMethod.Post,
  "https://your-domain/api/viewer/file-uri");
request.Content = content;
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());`;

const java = {
  "name": "Java",
  "highlight": "hljs language-java"
}
java["sample"] = `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
  .addFormDataPart("path","your//full//path//file")
  .build();
Request request = new Request.Builder()
  .url("https://your-domain/viewer/api/file-uri")
  .method("POST", body)
  .build();
Response response = client.newCall(request).execute();`

const javascript = {
  "name": "JavaScript",
  "highlight": "hljs language-javascript"
}
javascript["sample"] = `var formdata = new FormData();
formdata.append("path", "your//full//path//file");
var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
fetch("https://your-domain/viewer/api/file-uri", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`

const languages = [csharp, java, javascript]