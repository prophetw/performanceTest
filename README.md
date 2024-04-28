# [ghPages Demo](https://prophetw.github.io/performanceTest/)

```bash
pnpm i 
pnpm start
```

## Test regExp speed 
* new RegExp(param) sorted param is more faster than unsorted param  on first regExp.test

## Test map
* [].map(item=>map.set(item, ''));  sorted array is more faster than unsorted when map.get



#### Random Data  
> 1million data test 1million 

| unsorted randomData  | 60% True, 40% False | 99% True, 1% False | 20% True, 80% False |
|----------------------|---------------------|--------------------|--------------------|
| RegExp First Test    | 9s                  | 12s                 | 14s                 |
| RegExp Second Test   | 2s                  | 1.6s                 | 5s                  |
| Map                  | 160~190ms           | 160~190ms            | 160~190ms            |
|sorted randomData |
| RegExp First Test    | 5s                  | 7s | 7s |
| RegExp Second Test   | 350ms                  | 200ms                 | 1.4s |
| Map                  | 160~190ms           | 160~190ms            | 160~190ms            |


#### Real Data
> 1million data test 1million data is from 3D model meta info. A.test(B)  B is A's child-subset. 99% True, 1% False  

| unsorted realData  | 99% True, 1% False | 
|----------------------|--------------------|
| RegExp First Test    | 5s                  |
| RegExp Second Test   | 155ms               |
| Map                  | 160~190ms           |
| sorted realData ||
| RegExp First Test    | 2s                  |
| RegExp Second Test   | 155ms               |
| Map                  | 160~190ms           |


# Performance Comparison: RegExp vs Map
> Background: This comparison evaluates the performance of regular expressions (RegExp.test) and Map-based lookups (Map.get). The goal is to identify which approach is faster and under what conditions.

## Key Findings
1. Optimization in Regular Expression Engine:
* The regular expression engine is optimized, leading to faster performance in scenarios involving large-scale matching.
* Despite similar theoretical time complexity (O(n)), regular expressions generally perform better than String.indexOf in high-volume scenarios.

2. Impact of Data Sorting:
* Sorting improves performance for both regular expressions and Map-based lookups.
* For regular expressions, sorting significantly reduces the time for the first match and slightly improves subsequent matches.
* For Maps, sorting can lead to faster get operations.

3. Performance with Real-World Data:
* In a dataset of 1,000,000 entries with 99% successful matches, RegExp.test performs comparably to Map.get if Map.get doesn't have additional overhead.
* In a dataset with varying success rates, Map-based lookups are more stable regardless of data order.

4. Initialization vs Subsequent Matches:
* The first initialization of a regular expression is time-consuming, but subsequent matches are much faster.
* Map-based lookups incur additional overhead due to maintenance, but the actual get operations are quick.

5. Optimization Techniques:
* Sorting data before running regular expressions or Map-based lookups can speed up the initial matching.
* For real-world datasets, where the search sequence may align with the internal sequence of the regular expression, regular expressions perform better.

### Conclusion
* For large datasets, regular expressions often outperform Map-based lookups due to engine optimization and the ability to leverage data locality.
* In randomized data with varying success rates, Maps offer more consistent performance due to their stability.
* To optimize performance, sorting data can be beneficial for both regular expressions and Maps, but more so for regular expressions due to their reliance on ordered sequences.
