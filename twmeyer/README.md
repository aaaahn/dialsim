
# Mac Dr Coplon Dialysis Simulator (Updated for compatibility)

This directory houses a modified version of the [Mac Dr Coplon Dialysis Simulator](https://web.stanford.edu/~twmeyer/#:~:text=MacDr%20Coplon%20Dialysis%20Simulator.xls).  It is a macOS version of the model featured in [Downloadable computer models for renal replacement therapy](https://www.sciencedirect.com/science/article/pii/S0085253815516037?ref=pdf_download&fr=RR-2&rr=80654141fee5090f), but includes a minor tweak to ensure compatibility with recent version of Microsoft Excel for macOS.

## Modification Details

The sole adjustment pertains to two lines of VBA code within the `LockUpSheet` subroutine of the `Module1` module. No other alterations were made to the original model.

### Original Code:
```vb
Function LockUpSheet()
    Sheets(Calc).Protect DrawingObjects:=True, Contents:=True, Scenarios:=True
    Sheets(Intf).Protect DrawingObjects:=True, Contents:=True, Scenarios:=True
    Application.ScreenUpdating = True
End Function
```

### Revised Code:
```vb
Function LockUpSheet()
    ' Disable protection of the sheets during calculation operation
    Sheets(Calc).Protect DrawingObjects:=False, Contents:=False, Scenarios:=False
    Sheets(Intf).Protect DrawingObjects:=False, Contents:=False, Scenarios:=False
    Application.ScreenUpdating = True
End Function
```
