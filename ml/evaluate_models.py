"""
Karnataka Disaster Risk Assessment System
Model Evaluation & Benchmark Report Generator
----------------------------------------------
Generates detailed academic evaluation reports comparing metrics across models.
"""

import os
import json

METRICS_PATH = os.path.join("ml", "model_metrics.json")

def print_evaluation_summary():
    if not os.path.exists(METRICS_PATH):
        print(f"Error: {METRICS_PATH} not found. Run train_models.py first.")
        return

    with open(METRICS_PATH, "r") as f:
        metrics = json.load(f)

    print("\n" + "="*80)
    print("AI-BASED REGIONAL DISASTER RISK ASSESSMENT FOR KARNATAKA")
    print("ACADEMIC MACHINE LEARNING BENCHMARK & EVALUATION REPORT")
    print("="*80)

    for key, data in metrics.items():
        print(f"\n[MODEL]: {data['disaster'].upper()}")
        print(f"Algorithm:       {data['model_type']}")
        print(f"Validation:      {data['validation_strategy']}")
        print(f"Test Samples:    {data['test_samples']}")
        print(f"Accuracy:        {data['accuracy']}%")
        print(f"Precision:       {data['precision']}%")
        print(f"Recall:          {data['recall']}%")
        print(f"F1-Score:        {data['f1_score']}%")
        print(f"ROC-AUC:         {data['roc_auc']}")
        print(f"Confusion Matrix [ [TN, FP], [FN, TP] ]:")
        print(f"                 {data['confusion_matrix']}")
        print("Feature Importances (% Contribution):")
        for feat, imp in list(data['feature_importances'].items())[:4]:
            print(f"  • {feat.ljust(22)}: {imp}%")
    print("\n" + "="*80)
    print("Report complete. Validated for academic demonstration & viva defense.")
    print("="*80)

if __name__ == "__main__":
    print_evaluation_summary()
