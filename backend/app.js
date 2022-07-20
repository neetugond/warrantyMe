const express = require('express')
var request = require("request");
const app = new express();

const PORT = 3000
var api_key = "d1231e15033c8b8fe5eb81405bd75584"
var api_url = "GET https://gnews.io/api/v4/search?q=tesla&from=2022-06-1&sortby=published&Attoken=API-Token=" + api_key

app.get('/', (expreq, expres) => {
    request({
        url: api_url,
        method: "GET"
    },
        function (err, res, body) {
            console.log(body);
            var data = JSON.parse(body);
            var finalResponse = `<style>
            table thead th{
                background-color:black;
                color:blue
            }
                </style>
                <table>
                <thead>
                <th>Thumnail</th>
                <th>Title</th>
                <th>Description</th>
                <th>News URL</th>
                <th>Author</th>
                <th>PublishedAt</th>
                <th>contant</th>
                </thead>
                </table>`
            data = data.articles;
            for (var i in data) {
                finalResponse += `<tr>
                <td>
                <img src="${data[i].urlToImage}" style="width:200px"/>
                </td>
                <td>${data[i].title}</td>
                <td> ${data[i].description}</td>
                <td>${data[i].author}</td>
                <td> ${data[i].publishedAt}</td>
                <td>${data[i].content}</td></tr>`
            }
            finalResponse += `</tbody></table></body></html>`;
            expres.send(finalResponse)


        }
    )
})



app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})