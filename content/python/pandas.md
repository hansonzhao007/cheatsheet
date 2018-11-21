# concat two dataframes without losing the column headers

As stated in [merge, join, and concat](http://pandas.pydata.org/pandas-docs/stable/merging.html#concatenating-with-mixed-ndims) documentation, ignore index will remove all name references and use a range (0...n-1) instead. So it should give you the result you want once you remove ignore_index argument or set it to false (default).

```python
df = pd.concat([df, df2], axis=1)
```

This will join your df and df2 based on indexes (same indexed rows will be concatenated, if other dataframe has no member of that index it will be concatenated as nan).

