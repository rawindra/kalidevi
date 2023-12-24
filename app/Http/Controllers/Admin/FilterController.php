<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Filter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FilterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Filter/Index', [
            'filters' => Filter::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Filter/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'options' => 'required|array',
        ]);

        Filter::create($validated);

        return redirect()->route('admin.filters.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Filter $filter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Filter $filter)
    {
        return Inertia::render('Admin/Filter/Edit', [
            'filter' => $filter
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Filter $filter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'options' => 'required|array',
        ]);

        $filter->update($validated);

        return redirect()->route('admin.filters.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filter $filter)
    {
        $filter->delete();

        return redirect()->route('admin.filters.index');
    }
}
