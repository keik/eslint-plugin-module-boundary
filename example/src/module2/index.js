// depends on module inner the module boundary is OK.
import "./module2inner";

// depends on module outer the module boundary is NG.
import "../module1";
import "../module1/innerModule1";
