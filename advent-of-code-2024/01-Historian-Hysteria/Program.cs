// See https://aka.ms/new-console-template for more information

var left = new List<int>();
var right = new List<int>();

var splitter = new System.Text.RegularExpressions.Regex(@"(\d+)\s+(\d+)");

foreach (var line in File.ReadLines("input.txt"))
{
    var split = splitter.Matches(line);
    left.Add(Int32.Parse(split[0].Groups[1].Value));
    right.Add(Int32.Parse(split[0].Groups[2].Value));
}

left.Sort();
right.Sort();

int distance = 0;
int simularity = 0;

int j = 0;

Dictionary<int,int> occurrences = new Dictionary<int,int>();
for (int i = 0; i < left.Count; i++)
{
    distance += (left[i] > right[i]) ? left[i] - right[i] : right[i] - left[i];

    occurrences[right[i]] = occurrences.ContainsKey(right[i]) ? occurrences[right[i]] + 1 : 1;
}

simularity = left.ConvertAll(x => occurrences.ContainsKey(x) ? x * occurrences[x] : 0).Sum();

Console.WriteLine(distance);
Console.WriteLine(simularity);