<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **`/route/:slug` - Ye `:slug` Kya Hai?** 🎯

## **Answer: `:slug` ko **"Route Parameter"** kehte hain!**

```
:slug = Named Route Parameter (Dynamic value capture karta hai)
```


## **Simple Breakdown:**

```
Static Route:  /blog/post1          → Fixed
Dynamic Route: /blog/:slug          → Variable
Real URLs:
✅ /blog/my-first-post    → slug = "my-first-post" 
✅ /blog/how-to-code      → slug = "how-to-code"
✅ /blog/react-tutorial   → slug = "react-tutorial"
```


## **Technical Terms:**

```
`:slug` = **Route Parameter** / **Path Parameter** / **URL Parameter**
`:id`   = Same cheez, different name
```


## **Code Mein Kaise Milta Hai:**

```javascript
app.get('/blog/:slug', (req, res) => {
    console.log(req.params.slug);  // "my-first-post"
});
```


## **Common Names Used:**

```
:id     → User ID, Product ID (numbers)
:slug   → Blog post title, Product name (text)
:userId → Specific naming
:category → Category name
```

**Bottom Line: `:slug` = **Route Parameter** hai jo URL se dynamic value capture karta hai!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://stackoverflow.com/questions/30885547/express-dynamic-routing-using-and-slug-as-different-route-files

[^2]: https://www.w3schools.in/express-js/route-parameters

[^3]: https://masteringjs.io/tutorials/express/route-parameters

[^4]: https://www.geeksforgeeks.org/node-js/how-to-handle-route-parameters-in-express/

[^5]: https://ihechikara.com/posts/how-to-use-route-parameter-in-expressjs/

[^6]: https://expressjs.com/en/guide/routing.html

[^7]: https://www.youtube.com/watch?v=_87Ku_Ed3Cg

[^8]: https://stackoverflow.com/questions/74208232/how-do-you-make-a-node-js-route-by-slug-not-by-id

[^9]: https://www.youtube.com/watch?v=8PyrqrHqj1g

[^10]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

